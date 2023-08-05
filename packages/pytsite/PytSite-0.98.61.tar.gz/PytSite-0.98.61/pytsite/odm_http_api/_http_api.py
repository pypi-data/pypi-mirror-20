""" PytSite ODM Auth HTTP API.
"""
from json import loads as _json_loads, JSONDecodeError as _JSONDecodeError
from pytsite import http as _http, odm as _odm, odm_auth as _odm_auth

__author__ = 'Alexander Shepetko'
__email__ = 'a@shepetko.com'
__license__ = 'MIT'


def _fill_entity_fields(entity: _odm_auth.model.AuthorizableEntity, inp: dict):
    for k, v in inp.items():
        # Fields to skip
        if k in ('access_token', 'model', 'uid') or k.startswith('_'):
            continue

        field = entity.get_field(k)

        # Convert JSON string to object
        if isinstance(field, (_odm.field.List, _odm.field.Dict)):
            if isinstance(v, str):
                try:
                    v = _json_loads(v)
                except _JSONDecodeError as e:
                    raise _http.error.InternalServerError("JSON decoding error at field '{}': {}".format(k, e))
            else:
                raise _http.error.InternalServerError("Field '{}' is not properly JSON-encoded".format(k))

        # Resolve references
        if isinstance(field, _odm.field.Ref):
            v = _odm.resolve_ref(v, field.model)
        elif isinstance(field, _odm.field.RefsList):
            v = _odm.resolve_refs(v, field.model)

        # Set field's value
        try:
            entity.f_set(k, v)
        except (TypeError, ValueError) as e:
            raise _http.error.InternalServerError("Invalid format of field '{}': {}".format(k, e))


def get_entity(**kwargs) -> dict:
    """Get entity.
    """
    model = kwargs.get('model')
    if not model:
        raise _http.error.InternalServerError('Model is not specified.')

    uid = kwargs.get('uid')
    if not uid:
        raise _http.error.InternalServerError('UID is not specified.')

    # Search for entity
    entity = _odm.find(model).eq('_id', uid).first()  # type: _odm_auth.model.AuthorizableEntity
    if not entity:
        raise _http.error.NotFound('Entity not found.')

    # Check for entity's class
    if not isinstance(entity, _odm_auth.model.AuthorizableEntity):
        raise _http.error.InternalServerError("Model '{}' does not support transfer via HTTP.")

    # Check for permissions
    if not (entity.odm_auth_check_permission('view') or entity.odm_auth_check_permission('view_own')):
        raise _http.error.Forbidden('Insufficient permissions.')

    return entity.as_jsonable(**kwargs)


def post_entity(inp: dict, model: str) -> dict:
    """Create new entity.
    """
    # Dispense new entity
    entity = _odm.dispense(model)  # type: _odm_auth.model.AuthorizableEntity

    # Check for entity's class
    if not isinstance(entity, _odm_auth.model.AuthorizableEntity):
        raise _http.error.InternalServerError("Model '{}' does not support transfer via HTTP.")

    # Fill entity's fields with values
    _fill_entity_fields(entity, inp)

    # Save the entity
    entity.save()

    return entity.as_jsonable()


def patch_entity(inp: dict, model: str, uid: str) -> dict:
    """Update entity.
    """
    # Dispense existing entity
    entity = _odm.dispense(model, uid)  # type: _odm_auth.model.AuthorizableEntity

    # Check for entity's class
    if not isinstance(entity, _odm_auth.model.AuthorizableEntity):
        raise _http.error.InternalServerError("Model '{}' does not support transfer via HTTP.")

    # Check permissions
    if not (entity.odm_auth_check_permission('modify') or entity.odm_auth_check_permission('modify_own')):
        raise _http.error.Forbidden("Insufficient permissions.")

    # Fill fields with values
    with entity as e:
        _fill_entity_fields(e, inp)
        e.save()

    return entity.as_jsonable()


def delete_entity(inp: dict, model: str, uid: str):
    """Delete one or more entities.
    """
    with _odm.dispense(model, uid) as e:
        e.delete()
