"""PytSite ODM Event Handlers.
"""

from pytsite import console as _console, lang as _lang
from . import _api


def update_after():
    _console.run_command('odm', reindex=True, no_maint=True)


def db_restore():
    _console.print_info(_lang.t('pytsite.odm@entities_cache_cleared'))

    for model in _api.get_registered_models():
        _api.get_finder_cache(model).clear()
        _console.print_info(_lang.t('pytsite.odm@finder_cache_cleared', {'model': model}))
