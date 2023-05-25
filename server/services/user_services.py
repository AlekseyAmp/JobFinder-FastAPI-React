from fastapi import Depends, HTTPException
from fastapi_jwt_auth.exceptions import MissingTokenError

from config.jwt_config import AuthJWT


async def get_user_id(authorize: AuthJWT = Depends()):
    try:
        authorize.jwt_required()
        user_id = authorize.get_jwt_subject()
        return user_id
    except (MissingTokenError):
        raise HTTPException(
            status_code=401,
            detail="Не авторизован"
        )
