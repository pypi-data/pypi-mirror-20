__author__ = 'Akuukis <akuukis@kalvis.lv'

from beancount.core.number import D

from .common_functions import check_aliases_entry
from .common_functions import check_aliases_posting
from .common_functions import new_filtered_entries
from .common_functions import distribute_over_period

__plugins__ = ['depreciate']


def depreciate(entries, options_map, config_string):
    errors = []

    config_obj = eval(config_string, {}, {})
    if not isinstance(config_obj, dict):
        raise RuntimeError("Invalid plugin configuration: should be a single dict.")
    config = {
      # aliases_before  : config_obj.pop('aliases_before'  , ['spreadBefore']),
        'aliases_after'   : config_obj.pop('aliases_after'   , ['deprAfter', 'depr']),
        'alias_seperator' : config_obj.pop('seperator    '   , '-'),
        'default_duration': config_obj.pop('default_duration', 'Year'),
        'default_step'    : config_obj.pop('default_step'    , 'Day'),
        'min_value' : D(str(config_obj.pop('min_value'       , 0.05))),
        'max_new_tx'      : config_obj.pop('max_new_tx'      , 9999),
        'suffix'          : config_obj.pop('suffix'          , ' (depr %d/%d)'),
        'tag'             : config_obj.pop('tag'             , 'depreciated'),
        'translations'    : {
            config_obj.pop('account_assets'  , 'Assets:Fixed')     : config_obj.pop('account_expenses', 'Expenses:Depreciation'),
            config_obj.pop('account_liab'    , 'Liabilities:Fixed'): config_obj.pop('account_income'  , 'Income:Appreciation'),
        },
    }

    newEntries = []
    for i, entry in enumerate(entries):

        if not hasattr(entry, 'postings'):
            continue

        selected_postings = []
        for i, posting in enumerate(entry.postings):
            # TODO: ALIASES_BEFORE
            params = check_aliases_posting(posting, config) \
                  or check_aliases_entry(entry, config) \
                  or False
            if not params:
                continue

            for translation in config['translations']:
                if posting.account[0:len(translation)] == translation:
                    new_account = config['translations'][translation] + posting.account[len(translation):]
                    selected_postings.append( (i, new_account, params, posting) )

        if len(selected_postings) > 0:
            newEntries = newEntries + new_filtered_entries(entry, params, distribute_over_period, selected_postings, config)

    return entries + newEntries, errors
