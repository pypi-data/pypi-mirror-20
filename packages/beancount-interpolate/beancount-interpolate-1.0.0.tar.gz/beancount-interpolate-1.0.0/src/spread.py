__author__ = 'Akuukis <akuukis@kalvis.lv'

import datetime
import re
import math

from beancount.core.amount import Amount, add, sub, mul, div
from beancount.core import data
from beancount.core.position import Position
from beancount.core.number import ZERO, D, round_to

from .common_functions import check_aliases_entry
from .common_functions import check_aliases_posting
from .common_functions import distribute_over_duration
from .common_functions import get_dates
from .common_functions import longest_leg

__plugins__ = ['spread']


def get_entries(entry, selected_postings, params, DEFAULT_PERIOD, MIN_VALUE, MAX_NEW_TX, SUFFIX, TAG):
    all_amounts = []
    all_closing_dates = []
    for _ in entry.postings:
        all_amounts.append([])
        all_closing_dates.append([])

    for p, _, params, posting in selected_postings:
        total_duration, closing_dates = get_dates(params, entry.date, DEFAULT_PERIOD, MAX_NEW_TX)
        all_closing_dates[p] = closing_dates
        all_amounts[p] = distribute_over_duration(total_duration, posting.units.number, MIN_VALUE)

    map_closing_dates = {}
    for closing_dates in all_closing_dates:
        for date in closing_dates:
            map_closing_dates[date] = []

    for p, new_account, _, posting in selected_postings:
        for i in range( min(len(all_closing_dates[p]), len(all_amounts[p])) ):
            amount = Amount(all_amounts[p][i], posting.units.currency)
            # Income/Expense to be spread
            map_closing_dates[all_closing_dates[p][i]].append(data.Posting(account=posting.account,
                              units=amount,
                              cost=None,
                              price=None,
                              flag=posting.flag,
                              meta=None))

            # Asset/Liability that buffers the difference
            map_closing_dates[all_closing_dates[p][i]].append(data.Posting(account=new_account,
                              units=mul(amount, D(-1)),
                              cost=None,
                              price=None,
                              flag=posting.flag,
                              meta=None))

    new_transactions = []
    for date, postings in map_closing_dates.items():
        if len(postings) > 0:
            e = data.Transaction(
                date=date,
                meta=entry.meta,
                flag=entry.flag,
                payee=entry.payee,
                narration=entry.narration + SUFFIX%(i+1, total_duration),
                tags={TAG},
                links=entry.links,
                postings=postings)
            new_transactions.append(e)

    return new_transactions


def spread(entries, options_map, config_string):
    errors = []

    config_obj = eval(config_string, {}, {})
    if not isinstance(config_obj, dict):
        raise RuntimeError("Invalid plugin configuration: should be a single dict.")
    ACCOUNT_INCOME   = config_obj.pop('account_income'  , 'Liabilities:Current')
    ACCOUNT_EXPENSES = config_obj.pop('account_expenses', 'Assets:Current')
    # ALIASES_BEFORE   = config_obj.pop('aliases_before'  , ['spreadBefore'])
    ALIASES_AFTER    = config_obj.pop('aliases_after'   , ['spreadAfter', 'spread'])
    ALIAS_SEPERATOR  = config_obj.pop('aliases_after'   , '-')
    DEFAULT_PERIOD   = config_obj.pop('default_period'  , 'Month')
    MIN_VALUE        = config_obj.pop('min_value'       , 0.05)
    MAX_NEW_TX       = config_obj.pop('max_new_tx'      , 9999)
    SUFFIX           = config_obj.pop('suffix'          , ' (spread %d/%d)')
    TAG              = config_obj.pop('tag'             , 'spreaded')
    MIN_VALUE = D(str(MIN_VALUE))
    TRANSLATION = {
        'Income': ACCOUNT_INCOME,
        'Expenses': ACCOUNT_EXPENSES
    }

    newEntries = []
    for i, entry in enumerate(entries):

        if not hasattr(entry, 'postings'):
            continue

        selected_postings = []
        for i, posting in enumerate(entry.postings):
            # TODO: ALIASES_BEFORE
            params = check_aliases_posting(ALIASES_AFTER, posting) \
                  or check_aliases_entry(ALIASES_AFTER, entry, ALIAS_SEPERATOR) \
                  or False
            if not params:
                continue
            account = posting.account.split(':')
            if not account[0] in TRANSLATION:
                continue
            new_account = TRANSLATION[account[0]]+':'+':'.join(account[1:])
            selected_postings.append( (i, new_account, params, posting) )

        for i, new_account, params, posting in selected_postings:
            entry.postings.pop(i)
            entry.postings.insert(i, data.Posting(
                account=new_account,
                units=Amount(posting.units.number, posting.units.currency),
                cost=None,
                price=None,
                flag=None,
                meta=None))

        if len(selected_postings) > 0:
            newEntries = newEntries + get_entries(entry, selected_postings, params, DEFAULT_PERIOD, MIN_VALUE, MAX_NEW_TX, SUFFIX, TAG)

    return entries + newEntries, errors
