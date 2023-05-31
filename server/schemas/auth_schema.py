from pydantic import BaseModel


class RegisterForm(BaseModel):
    name: str
    surname: str
    phone_number: str
    email: str
    password: str

    class Config:
        orm_mode = True


class LoginForm(BaseModel):
    phone_number: str
    password: str

    class Config:
        orm_mode = True
