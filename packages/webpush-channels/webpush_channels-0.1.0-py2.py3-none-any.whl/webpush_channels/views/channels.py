import colander
from cornice.validators import colander_body_validator
from pyramid import httpexceptions

from pywebpush import WebPusher

from kinto.core import Service
from kinto.core.resource.viewset import StrictSchema, SimpleSchema
from kinto.core.storage.exceptions import RecordNotFoundError
from kinto.core.authorization import PRIVATE

from ..utils import canonical_json


REGISTRATION_COLLECTION_ID = 'channel_registration'
SUBSCRIPTION_COLLECTION_ID = 'subscription'

channel = Service(name='channel',
                  description='Handle channel information',
                  path='/channels/{channel_id}')


channel_registration = Service(name='channel_registration',
                               description='Handle user registration for a channel',
                               path='/channels/{channel_id}/registration')


class PayloadSchema(StrictSchema):
    data = SimpleSchema(missing=colander.drop)


# Channel views
@channel.post(permission=PRIVATE, schema=PayloadSchema(), validators=(colander_body_validator,))
def send_push_notifications(request):
    channel_id = request.matchdict['channel_id']
    parent_id = '/channels/{}'.format(channel_id)

    registrations, count = request.registry.storage.get_all(
        collection_id=REGISTRATION_COLLECTION_ID,
        parent_id=parent_id)

    subscriptions = []

    for registration in registrations:
        user_subscriptions, count = request.registry.storage.get_all(
            collection_id=SUBSCRIPTION_COLLECTION_ID,
            parent_id=registration['id'])
        subscriptions += user_subscriptions

    for subscription in subscriptions:
        del subscription['id']
        del subscription['last_modified']
        data = request.validated.get('data')
        if data:
            data = canonical_json(data)
        push_initialize = WebPusher(subscription)
        push_initialize.send(data=data, ttl=15)

    request.response.status = 202
    return {"code": 202, "message": "Accepted"}


@channel.get(permission=PRIVATE)
def retrieve_channel_information(request):
    channel_id = request.matchdict['channel_id']
    parent_id = '/channels/{}'.format(channel_id)

    registrations, count = request.registry.storage.get_all(
        collection_id=REGISTRATION_COLLECTION_ID,
        parent_id=parent_id)

    user_registered = [r for r in registrations if r['id'] == request.prefixed_userid]

    if not user_registered:
        raise httpexceptions.HTTPForbidden()

    return {"data": {
        "registrations": count,
        "push": 0
    }}


# Channel Registration views
@channel_registration.put(permission=PRIVATE)
def add_user_registration(request):
    channel_id = request.matchdict['channel_id']
    parent_id = '/channels/{}'.format(channel_id)

    request.registry.storage.update(
        collection_id=REGISTRATION_COLLECTION_ID,
        parent_id=parent_id,
        object_id=request.prefixed_userid,
        record={})

    request.response.status = 202
    return {"code": 202, "message": "Accepted"}


@channel_registration.delete(permission=PRIVATE)
def remove_user_registration(request):
    channel_id = request.matchdict['channel_id']
    parent_id = '/channels/{}'.format(channel_id)

    try:
        request.registry.storage.delete(
            collection_id=REGISTRATION_COLLECTION_ID,
            parent_id=parent_id,
            object_id=request.prefixed_userid,
            with_deleted=True)
    except RecordNotFoundError:
        # If the record has already been removed that's fine.
        pass
    request.response.status = 202
    return {"code": 202, "message": "Accepted"}
