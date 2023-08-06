
Falcon-Marshmallow is a middleware library designed to assist
developers who wish to easily incorporate automatic (de)serialization
using Marshmallow schemas into their Falcon application. Once
the middleware is in place, requests to any resources that have
a ``schema`` attribute defined will automatically use that schema
to parse the request body. In addition, responses for that resource
will automatically use the defined schema to dump results.

You may also specify method-specific schemas on a resource, e.g.
``patch_schema``, which will be used only when the request method
matches the schema prefix.

By default, this middleware will also automatically parse requests
and responses to JSON even if they do not have any schema(s) defined.
This can be easily disabled, if you would prefer to use your own JSON
parsing middleware. This is done using ``simplejson`` by default,
but you may specify any module or object you like that implements
the public interface of the standard library ``json`` module.


