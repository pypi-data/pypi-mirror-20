from django.http import Http404

from django_alt.abstract.endpoints import MetaEndpoint
from django_alt.utils.shortcuts import queryset_has_many


class Endpoint(metaclass=MetaEndpoint):
    @classmethod
    def as_view(cls, **kwargs):
        """
        Main entry point for a request-response process.
        Allows to use handler.as_view() directly in urlpatterns.
        """
        return cls.view.as_view(**kwargs)

    """
    Default view handler implementations
    """

    @classmethod
    def on_get(cls, request, queryset, permission_test=None, **url) -> (dict, int):
        """
        Default GET handler implementation.
        Must return a tuple containing the response that is fed to the serializer and a status code.
        Safe to raise Validation, Permission and HTTP errors
        :param request: view request object
        :param queryset: queryset from the endpoint config
        :param permission_test: (optional) permission test to execute after full validation
        :param url: (optional) view url kwargs
        :return: {response_to_serialize, status_code}
        """
        if permission_test:
            cls.serializer._check_permissions(permission_test, request.data)
        return cls.serializer(queryset, many=queryset_has_many(queryset)).data, 200

    @classmethod
    def on_post(cls, request, permission_test=None, **url) -> (dict, int):
        """
        Default POST handler implementation
        Must return a tuple containing the response that is fed to the serializer and a status code.
        Safe to raise Validation, Permission and HTTP errors
        :param request: view request object
        :param permission_test: (optional) permission test to execute after full validation
        :param url: (optional) view url kwargs
        :return: {response_to_serialize, status_code}
        """
        is_many = isinstance(request.data, list)
        serializer = cls.serializer(data=request.data,
                                    permission_test=permission_test,
                                    many=is_many)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return serializer.data, 201

    @classmethod
    def on_patch(cls, request, queryset, permission_test=None, **url) -> (dict, int):
        """
        Default PATCH handler implementation
        Must return a tuple containing the response that is fed to the serializer and a status code.
        Safe to raise Validation, Permission and HTTP errors
        :param request: view request object
        :param queryset: queryset from the endpoint config
        :param [permission_test]: permission test to execute after full validation
        :param [url]: view url kwargs
        :return: {response_to_serialize, status_code}
        """
        if queryset is None:
            raise Http404
        if queryset_has_many(queryset):
            raise NotImplementedError()
        serializer = cls.serializer(queryset,
                                    data=request.data,
                                    many=queryset_has_many(queryset),
                                    partial=True,
                                    permission_test=permission_test)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return serializer.data, 200

    @classmethod
    def on_put(cls, request, queryset, permission_test=None, **url) -> (dict, int):
        """
        TBD
        :param request:
        :param queryset:
        :param permission_test:
        :param url:
        :return:
        """
        raise NotImplementedError()

    @classmethod
    def on_delete(cls, request, queryset, permission_test=None, **url) -> (dict, int):
        """
        Default DELETE handler implementation
        Must return a tuple containing the response that is fed to the serializer and a status code.
        Safe to raise Validation, Permission and HTTP errors
        :param request: view request object
        :param queryset: queryset from the endpoint config
        :param permission_test: (optional) permission test to execute after full validation
        :param url: (optional) view url kwargs
        :return: {response_to_serialize, status_code}
        """
        if queryset is None:
            raise Http404
        validator = cls.serializer.Meta.validator_class(model=cls.model)
        validator.will_delete(queryset)
        cls.serializer._check_permissions(permission_test, request.data)
        data = cls.serializer(queryset, many=queryset_has_many(queryset)).data
        queryset.delete()
        return data, 200

    """
    Default permission handler implementations
    """

    @classmethod
    def can_default(cls):
        """
        Defines a pair of optional permission checker functions (pre_validation_func, post_validation_func).
        First is called initially before any validation.
        Second is called after validation finishes.
        They return a `bool` value and their calling signatures are as defined below.
        Alternatively these values can be used instead of callables:
            True  -> permission always granted,
            False -> permission never granted,
            None  -> no permission needed (True <=> None, the distinction is only semantic)
        :return: (pre_validation_func=None, post_validation_func=None)
        """
        return (
            lambda request, **url: True,
            lambda request, queryset, attrs: True
        )

    @classmethod
    def can_get(cls):
        return cls.can_default()

    @classmethod
    def can_post(cls):
        return cls.can_default()

    @classmethod
    def can_patch(cls):
        return cls.can_default()

    @classmethod
    def can_put(cls):
        return cls.can_default()

    @classmethod
    def can_delete(cls):
        return cls.can_default()
