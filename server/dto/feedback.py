from pydantic import BaseModel


class Feedback(BaseModel):
    applicant_id: str
    vacancy_id: str

    class Config:
        orm_mode = True
