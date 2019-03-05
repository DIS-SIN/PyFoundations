from sqlalchemy.ext.declarative import DeclarativeMeta
from flask import json


class AlchemyDecoder(json.JSONDecoder):
    def default(self, json_data, model):  # pylint: disable=E0202
        JSON_INDEX = 0
        MODEL_INDEX = 1
        return_model = model()
        for f in model.__json_fields__(model):
            if f in json_data:
                setattr(return_model, f, json_data[f])
        if hasattr(model, "__json_relationships__"):
            for r in model.__json_relationships__(model):
                if r[JSON_INDEX] in json_data:
                    arr = []
                    for json_tag in json_data[r[JSON_INDEX]]:
                        new_obj = self.default(json_tag, r[MODEL_INDEX])
                        arr.append(new_obj)
                    setattr(return_model, r[JSON_INDEX], arr)
        return return_model
