# -*- coding: utf-8 -*-

from flask import Blueprint


class Api(object):

    def __init__(self, app=None):
        self.app = None
        self.blueprint = None

        if app is not None:
            if isinstance(app, Blueprint):
                self.blueprint = app
            else:
                self.app = app

        self.resources = []

    def init_app(self, app):
        """Update flask application with our api

        :param Application app: a flask application
        """
        if self.blueprint is not None:
            app.register_blueprint(self.blueprint)
        else:
            self.app = app
            for resource in self.resources:
                self.route(**resource)

    def route(self, resource, endpoint, *urls, **kwargs):
        """Create an api endpoint.

        :param Resource resource: a resource class inherited from flask_rest_jsonapi.resource.Resource
        :param str endpoint: the endpoint name
        :param list urls: the urls of the endpoint
        :param dict kwargs: additional options of the route
        """
        resource.endpoint = endpoint
        view_func = resource.as_view(endpoint)
        options = kwargs.get('url_rule_options') or dict()

        if self.app is not None:
            for url in urls:
                self.app.add_url_rule(url, view_func=view_func, **options)
        elif self.blueprint is not None:
            resource.endpoint = '.'.join([self.blueprint.name, resource.endpoint])
            for url in urls:
                self.blueprint.add_url_rule(url, view_func=view_func, **options)
        else:
            self.resources.append({'resource': resource,
                                   'endpoint': endpoint,
                                   'urls': urls,
                                   'options': options})
