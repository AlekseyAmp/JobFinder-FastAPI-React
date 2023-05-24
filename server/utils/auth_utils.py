from passlib.context import CryptContext
from datetime import timedelta

from config.jwt_config import AuthJWT
from config.settings import settings


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(password: str, hashed_password: str):
    return pwd_context.verify(password, hashed_password)


async def create_access_token(authorize: AuthJWT, user_id: str):
    access_token = authorize.create_access_token(
        subject=user_id,
        expires_time=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRES_IN)
    )
    return access_token


async def create_refresh_token(authorize: AuthJWT, user_id: str):
    refresh_token = authorize.create_refresh_token(
        subject=user_id,
        expires_time=timedelta(minutes=settings.REFRESH_TOKEN_EXPIRES_IN)
    )
    return refresh_token
