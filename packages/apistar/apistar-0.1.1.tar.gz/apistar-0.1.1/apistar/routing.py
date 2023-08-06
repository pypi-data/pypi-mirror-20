from apistar import pipelines, http, wsgi
from apistar.pipelines import ArgName
from collections import namedtuple
from typing import Any, List, TypeVar
from uritemplate import URITemplate
from werkzeug.routing import Map, Rule, parse_rule
import inspect
import json

# TODO: Path
# TODO: 404
# TODO: Redirects
# TODO: Caching

Route = namedtuple('Route', ['path', 'method', 'view'])
Endpoint = namedtuple('Endpoint', ['view', 'pipeline'])


class URLPathArgs(dict):
    pass


class URLPathArg(object):
    schema = None

    @classmethod
    def build(cls, args: URLPathArgs, arg_name: ArgName):
        value = args.get(arg_name)
        if cls.schema is not None and not isinstance(value, cls.schema):
            value = cls.schema(value)
        return value


class Router(object):
    converters = {
        str: 'string',
        int: 'int',
        float: 'float'
        # path, any, uuid
    }

    def __init__(self, routes: List[Route]):
        required_type = wsgi.WSGIResponse
        initial_types = [wsgi.WSGIEnviron, URLPathArgs]

        rules = []
        views = {}

        for (path, method, view) in routes:
            view_signature = inspect.signature(view)
            uritemplate = URITemplate(path)

            # Ensure view arguments include all URL arguments
            for arg in uritemplate.variable_names:
                assert arg in view_signature.parameters, (
                    'URL argument "%s" in path "%s" must be included as a '
                    'keyword argument in the view function "%s"' %
                    (arg, path, view.__name__)
                )

            # Create a werkzeug path string
            werkzeug_path = path[:]
            for arg in uritemplate.variable_names:
                param = view_signature.parameters[arg]
                if param.annotation == inspect.Signature.empty:
                    annotated_type = str
                else:
                    annotated_type = param.annotation
                converter = self.converters[annotated_type]
                werkzeug_path = werkzeug_path.replace(
                    '{%s}' % arg,
                    '<%s:%s>' % (converter, arg)
                )

            # Create a werkzeug routing rule
            name = view.__name__
            rule = Rule(werkzeug_path, methods=[method], endpoint=name)
            rules.append(rule)

            # Determine any inferred type annotations for the view
            extra_annotations = {}
            for arg in uritemplate.variable_names:
                extra_annotations[arg] = URLPathArg
            if 'return' not in view.__annotations__:
                extra_annotations['return'] = http.ResponseData

            # Determine the pipeline for the view.
            pipeline = pipelines.build_pipeline(view, initial_types, required_type, extra_annotations)
            views[name] = Endpoint(view, pipeline)

        self.adapter = Map(rules).bind('example.com')
        self.views = views

    def lookup(self, path, method):
        (name, kwargs) = self.adapter.match(path, method)
        (view, pipeline) = self.views[name]
        return (view, pipeline, kwargs)


def not_found_view() -> http.Response:
    return http.Response({'message': 'Not found'}, 404)
