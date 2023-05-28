from fastapi import Response, HTTPException
from sqlalchemy.orm import Session

from config.jwt_config import AuthJWT
from config.settings import settings
from schemas.auth_schema import Register, Login
from models.user import User
from utils.auth_utils import (
    hash_password,
    verify_password,
    is_valid_email,
    create_access_token,
    create_refresh_token
)


async def create_user(data: Register, response: Response, db: Session, authorize: AuthJWT):
    if not is_valid_email(data.email):
        raise HTTPException(
            status_code=400,
            detail="Неверный адрес электронной почты"
        )

    phone_exists = db.query(User).filter(
        User.phone_number == data.phone_number
    ).first()

    email_exists = db.query(User).filter(
        User.email == data.email
    ).first()

    if phone_exists or email_exists:
        raise HTTPException(
            status_code=409,
            detail="Аккаунт уже существует"
        )

    new_user = User(
        name=data.name,
        surname=data.surname,
        email=data.email.lower(),
        phone_number=data.phone_number,
        password=hash_password(data.password),
    )

    db.add(new_user)
    db.commit()

    access_token = await create_access_token(authorize, str(new_user.id))
    refresh_token = await create_refresh_token(authorize, str(new_user.id))

    response.set_cookie("access_token",
                        access_token,
                        settings.ACCESS_TOKEN_EXPIRES_IN * 60,
                        settings.ACCESS_TOKEN_EXPIRES_IN * 60,
                        "/",
                        None,
                        False,
                        True,
                        "lax"
                        )

    response.set_cookie("refresh_token",
                        refresh_token,
                        settings.REFRESH_TOKEN_EXPIRES_IN * 60,
                        settings.REFRESH_TOKEN_EXPIRES_IN * 60,
                        "/",
                        None,
                        False,
                        True,
                        "lax"
                        )

    return {
        "id": new_user.id,
        "name": new_user.name,
        "surname": new_user.surname,
        "phone_number": new_user.phone_number,
        "email": new_user. email,
        "access_token": access_token,
        "refresh_token": refresh_token
    }


async def login_user(data: Login, response: Response, db: Session, authorize: AuthJWT):
    user = db.query(User).filter(
        User.phone_number == data.phone_number
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Аккаунт не найден"
        )

    if not verify_password(data.password, user.password):
        raise HTTPException(
            status_code=400,
            detail="Неверная почта или пароль"
        )

    access_token = await create_access_token(authorize, str(user.id))
    refresh_token = await create_refresh_token(authorize, str(user.id))

    response.set_cookie("access_token",
                        access_token,
                        settings.ACCESS_TOKEN_EXPIRES_IN * 60,
                        settings.ACCESS_TOKEN_EXPIRES_IN * 60,
                        "/",
                        None,
                        False,
                        True,
                        "lax"
                        )

    response.set_cookie("refresh_token",
                        refresh_token,
                        settings.REFRESH_TOKEN_EXPIRES_IN * 60,
                        settings.REFRESH_TOKEN_EXPIRES_IN * 60,
                        "/",
                        None,
                        False,
                        True,
                        "lax"
                        )

    return {
        "id": user.id,
        "name": user.name,
        "surname": user.surname,
        "phone_number": user.phone_number,
        "email": user.email,
        "access_token": access_token,
        "refresh_token": refresh_token
    }


async def refresh_token(authorize: AuthJWT, response: Response, user_id: str):
    access_token = await create_access_token(authorize, user_id)

    response.set_cookie("access_token",
                        access_token,
                        settings.ACCESS_TOKEN_EXPIRES_IN * 60,
                        settings.ACCESS_TOKEN_EXPIRES_IN * 60,
                        "/",
                        None,
                        False,
                        True,
                        "lax")

    return access_token


async def logout_user(response: Response, authorize: AuthJWT):
    authorize.unset_jwt_cookies()
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"status": "success"}
