from pydantic import BaseModel


class Applicant(BaseModel):
    speciality: str
    experience: str
    salary: str
    resume_text: str

    class Config:
        orm_mode = True
