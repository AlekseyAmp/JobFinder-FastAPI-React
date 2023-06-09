from pydantic import BaseModel
from typing import List


class Vacancy(BaseModel):
    name: str
    description: str
    place: str
    salary: str
    experience: str
    tags: List[str]

    class Config:
        orm_mode = True
