from fastapi import Response, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from config.database import get_db
from config.jwt_config import AuthJWT
from config.settings import settings
from utils.auth_utils import hash_password, verify_password, create_access_token, create_refresh_token
from schemas.auth_schema import Register, Login
from models.user import User


async def create_new_user(data: Register, db: Session = Depends(get_db)):
    phone_exists = db.query(User).filter(User.phone_number == data.phone_number).first()

    if phone_exists:
        raise HTTPException(
            status_code=409,
            detail="Аккаунт уже существует"
        )
    

async def login_user(data: Login, db: Session = Depends(get_db), response: Response, authorize: AuthJWT = Depends()):
    user = db.query(User).filter(User.phone_number == data.phone_number).first()

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
                        expires=datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRES_IN),
                        secure=True,
                        httponly=True,
                        samesite="Lax")

    response.set_cookie("refresh_token",
                        refresh_token,
                        expires=datetime.utcnow() + timedelta(minutes=settings.REFRESH_TOKEN_EXPIRES_IN),
                        secure=True,
                        httponly=True,
                        samesite="Lax")

    return {"status": "success"}


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

    response.set_cookie("logged_in",
                        True,
                        settings.ACCESS_TOKEN_EXPIRES_IN * 60,
                        settings.ACCESS_TOKEN_EXPIRES_IN * 60,
                        "/",
                        None,
                        False,
                        False,
                        "lax")

    return access_token


async def logout_user(response: Response, authorize: AuthJWT = Depends()):
    authorize.unset_jwt_cookies()
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {"status": "success"}
