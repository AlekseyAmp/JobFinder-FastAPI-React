from fastapi import HTTPException
from pydantic import BaseModel


def check_data_on_empty(data: BaseModel):
    for field in data.__fields__:
        value = getattr(data, field)
        if not value:
            raise HTTPException(
                status_code=400,
                detail="One or more field(s) is empty"
            )
    return True
