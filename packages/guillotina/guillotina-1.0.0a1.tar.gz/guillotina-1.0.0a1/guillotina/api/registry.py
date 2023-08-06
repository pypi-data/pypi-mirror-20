# -*- coding: utf-8 -*-
from guillotina import configure
from guillotina.api.service import Service
from guillotina.api.service import TraversableService
from guillotina.browser import ErrorResponse
from guillotina.browser import Response
from guillotina.component import getMultiAdapter
from guillotina.i18n import MessageFactory
from guillotina.interfaces import IJSONToValue
from guillotina.interfaces import IRegistry
from guillotina.interfaces import ISite
from guillotina.interfaces import IValueToJson
from guillotina.json.exceptions import DeserializationError
from guillotina.schema import getFields
from guillotina.utils import import_class
from guillotina.utils import resolve_dotted_name
from zope.interface.interfaces import ComponentLookupError


_ = MessageFactory('guillotina')


_marker = object()


@configure.service(
    context=ISite, method='GET', permission='guillotina.ReadConfiguration',
    name='@registry',
    description='Read site registry settings')
class Read(TraversableService):
    key = _marker
    value = None

    async def publish_traverse(self, traverse):
        if len(traverse) == 1:
            # we want have the key of the registry
            self.key = traverse[0]
            self.value = self.request.site_settings.get(self.key, _marker)
            if self.value is _marker:
                raise KeyError(self.key)
        return self

    async def __call__(self):
        if self.key is _marker:
            # Root of registry
            self.value = self.request.site_settings
        if IRegistry.providedBy(self.value):
            result = {}
            for key in self.value.keys():
                try:
                    value = IValueToJson(self.value[key])
                except (ComponentLookupError, TypeError):
                    value = self.value[key]
                result[key] = value
        else:
            try:
                result = IValueToJson(self.value)
            except (ComponentLookupError, TypeError):
                result = self.value
        return {
            'value': result
        }


@configure.service(
    context=ISite, method='POST', permission='guillotina.RegisterConfigurations',
    name='@registry',
    description='Register a new interface to for registry settings',
    options={
        'interface': {
            'label': 'dotted name of interface to install',
            'type': 'string',
            'required': True
        },
        'initial_values': {
            'label': 'Initial value settings',
            'type': 'object',
            'required': False
        }
    })
class Register(Service):
    """Register an Interface on the Registry."""

    async def __call__(self):
        """ data input : { 'interface': 'INTERFACE' }"""
        if not hasattr(self.request, 'site_settings'):
            return ErrorResponse(
                'BadRequest',
                _("Not in a site request"))

        data = await self.request.json()
        interface = data.get('interface', None)
        initial_values = data.get('initial_values', {})
        if interface is None:
            return ErrorResponse(
                'InvalidRequest',
                'Non existent Interface')

        registry = self.request.site_settings
        iObject = import_class(interface)
        registry.register_interface(iObject)
        config = registry.for_interface(iObject)

        # Initialize values
        # If its defined on the guillotina.schema default will not be overwritten
        #  you will need to PATCH
        for key, field in getFields(iObject).items():
            if key in initial_values and getattr(config, key, _marker) == _marker:
                # We don't have a value
                config[key] = initial_values[key]

        return Response(response={}, status=201)


@configure.service(
    context=ISite, method='PATCH', permission='guillotina.WriteConfiguration',
    name='@registry',
    description='Update registry setting',
    options={
        'value': {
            'type': 'string',
            'label': 'The value to set on the registry setting',
            'required': True
        }
    })
class Write(TraversableService):
    key = _marker
    value = None

    async def publish_traverse(self, traverse):
        if len(traverse) == 1 and traverse[0] in self.request.site_settings:
            # we want have the key of the registry
            self.key = traverse[0]
            self.value = self.request.site_settings.get(self.key)
        return self

    async def __call__(self):
        if self.key is _marker:
            # No option to write the root of registry
            return ErrorResponse('InvalidRequest', 'Needs the registry key')

        data = await self.request.json()
        if 'value' in data:
            value = data['value']
        else:
            value = data

        assert '.' in self.key, 'Registry key must be dotted.iface.name.fieldname'  # noqa
        iface, name = self.key.rsplit('.', 1)
        iface = resolve_dotted_name(iface)
        field = iface[name]

        try:
            new_value = getMultiAdapter((value, field), IJSONToValue)
        except ComponentLookupError:
            return ErrorResponse(
                'DeserializationError',
                'Cannot deserialize type {}'.format(str(self.field)),
                status=501)

        try:
            self.request.site_settings[self.key] = new_value
        except DeserializationError as e:
            return ErrorResponse(
                'DeserializationError',
                str(e),
                exc=e,
                status=400)

        return Response(response={}, status=204)
