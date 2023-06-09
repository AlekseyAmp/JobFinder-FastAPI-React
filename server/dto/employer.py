from pydantic import BaseModel


class Employer(BaseModel):
    company_name: str
    company_description: str
    contact: str
    website: str

    class Config:
        orm_mode = True
