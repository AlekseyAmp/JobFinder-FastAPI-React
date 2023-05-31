from pydantic import BaseModel


def check_form_on_empty(data: BaseModel):
    for field in data.__fields__:
        value = getattr(data, field)
        if not value:
            return False
    return True
