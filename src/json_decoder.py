from sqlalchemy.ext.declarative import DeclarativeMeta
from flask import json


class AlchemyDecoder(json.JSONDecoder):
    def default(self, json, model):  # pylint: disable=E0202
        for thing in json:
            print(json[thing])
        #     valid_fields = obj.__json__() if hasattr(obj, "__json__") else dir(obj)
        #     fields = {}
        #     for field in [
        #         x for x in valid_fields if not x.startswith("_") and x != "metadata"
        #     ]:
        #         data = obj.__getattribute__(field)
        #         try:
        #             # this will fail on non-encodable values, like other classes
        #             json.dumps(data)
        #             fields[field] = data
        #         except TypeError:
        #             fields[field] = None
        #     # a json-encodable dict
        #     return fields
        #
        # return json.JSONEncoder.default(self, obj)
