def construct_row_object(model, json, key_of_columns = None):
    if not key_of_columns is None:
        json = json[key_of_columns]
    new_row = model()
    for key in json:
        try:
            getattr(model, key)
            setattr(model, key, json[key])
        except AttributeError as e:
            if not e.args:
                e.args = ('',)
            e.args = ('A column was specified that \
                does not exist in the table', ) + e.args
            raise e
    return new_row
    