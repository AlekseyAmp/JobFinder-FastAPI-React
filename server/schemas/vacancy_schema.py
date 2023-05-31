from pydantic import BaseModel
from typing import List


class VacancyForm(BaseModel):
    name: str
    description: str
    place: str
    salary: str
    tags: List[str]

    class Config:
        orm_mode = True
