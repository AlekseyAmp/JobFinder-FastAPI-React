from pydantic import BaseModel


class EmployerForm(BaseModel):
    company_name: str
    company_description: str

    class Config:
        orm_mode = True
