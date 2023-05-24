from pydantic import BaseModel


class Register(BaseModel):
    name: str
    surname: str
    email: str
    phone_number: str
    password: str

    class Config:
        orm_mode = True


class Login(BaseModel):
    phone_number: str
    password: str

    class Config:
        orm_mode = True
