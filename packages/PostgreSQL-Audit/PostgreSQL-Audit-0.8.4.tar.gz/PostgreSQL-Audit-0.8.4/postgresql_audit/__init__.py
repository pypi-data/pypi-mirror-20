from .base import (  # noqa
    activity_base,
    assign_actor,
    ImproperlyConfigured,
    versioning_manager,
    VersioningManager
)
from .expressions import jsonb_change_key_name, jsonb_merge  # noqa
from .migrations import (  # noqa
    add_column,
    alter_column,
    change_column_name,
    remove_column,
    rename_table
)

__version__ = '0.8.4'
