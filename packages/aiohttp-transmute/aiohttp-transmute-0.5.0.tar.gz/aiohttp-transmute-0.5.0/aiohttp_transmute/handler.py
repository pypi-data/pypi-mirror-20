from functools import wraps
from aiohttp.errors import HttpProcessingError
from transmute_core.exceptions import APIException, NoSerializerFound
from transmute_core.function.signature import NoDefault
from transmute_core import ParamExtractor, NoArgument
from aiohttp import web


def create_handler(transmute_func, context):

    @wraps(transmute_func.raw_func)
    async def handler(request):
        exc, result = None, None
        try:
            args, kwargs = await extract_params(request, context,
                                                transmute_func)
            result = await transmute_func.raw_func(*args, **kwargs)
        except HttpProcessingError as hpe:
            code = hpe.code if hasattr(hpe, "code") else 400
            exc = APIException(code=code, message=str(hpe.message))
        except Exception as e:
            exc = e
        response = transmute_func.process_result(
            context, result, exc, request.content_type
        )
        return web.Response(
            body=response["body"], status=response["code"],
            content_type=response["content-type"]
        )

    handler.transmute_func = transmute_func
    return handler


async def extract_params(request, context, transmute_func):
    body = await request.content.read()
    content_type = request.content_type
    extractor = ParamExtractorAIOHTTP(request, body)
    return extractor.extract_params(
        context, transmute_func, content_type
    )


class ParamExtractorAIOHTTP(ParamExtractor):

    def __init__(self, request, body):
        self._request = request
        self._body = body

    def _get_framework_args(self):
        return {"request": self._request}

    @property
    def body(self):
        return self._body

    def _query_argument(self, key, is_list):
        if key not in self._request.GET:
            return NoArgument
        if is_list:
            return self._request.GET.getall(key)
        else:
            return self._request.GET[key]

    def _header_argument(self, key):
        return self._request.headers.get(key, NoArgument)

    def _path_argument(self, key):
        return self._request.match_info.get(key, NoArgument)
