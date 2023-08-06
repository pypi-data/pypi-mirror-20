import json

from axsemantics.base import ListResource
from axsemantics import constants


class CreateableMixin:
    def create(self, api_token=None, api_base=None, **params):
        self.api_token=api_token
        params = {key: self[key] for key in self.required_fields}
        params.update(self.serialize(None))
        self.load_data(self.request('post', self.instance_url(), params=params), api_token=api_token)
        return self


class UpdateableMixin:
    @property
    def required_fields(self):
        return []

    def __init__(self, *args, **kwargs):
        super(UpdateableMixin, self).__init__(*args, **kwargs)
        self.update(kwargs)
        for key in self.required_fields:
            if not key in kwargs:
                self[key] = None

    def save(self):
        # these would be the params for PATCH
        # params = {key: self[key] for key in self.required_fields}
        # params.update(self.serialize(None))
        params = json.dumps(self)
        self.load_data(self.request('put', self.instance_url(), params))
        return self


class DeleteableMixin:
    def delete(self, params=None):
        self.load_data(self.request('delete', self.instance_url(), params))
        return self


class ListableMixin:
    list_class = None

    @classmethod
    def all(cls):
        if not cls.list_class:
            return ListResource(initial_url=cls.class_url(), class_name=cls.class_name)
        return cls.list_class


class ContentGenerationMixin:
    def generate_content(self, force=False, params=None):
        url = '{}generate_content/?force={}'.format(self.instance_url(), str(force).lower())
        return self.request('post', url, params)


class RincewindMixin:
    def __init__(self, api_token=None, api_base=None, **kwargs):
        api_token = api_token or constants.API_TOKEN_RINCEWIND
        api_base = api_base or constants.API_BASE_RINCEWIND
        super(RincewindMixin, self).__init__(api_token=api_token, api_base=api_base, **kwargs)
