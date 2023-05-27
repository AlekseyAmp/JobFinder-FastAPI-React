from pydantic import BaseModel


class EmployerData(BaseModel):
    company_name: str
    company_description: str

    class Config:
        orm_mode = True
