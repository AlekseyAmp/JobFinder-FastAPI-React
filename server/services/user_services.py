from fastapi import HTTPException, Depends
from fastapi_jwt_auth.exceptions import MissingTokenError
from sqlalchemy.orm import Session

from config.jwt_config import AuthJWT
from models.user import User


async def get_user_info(db: Session, user_id: str):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "id": user.id,
        "name": user.name,
        "surname": user.surname,
        "phone_number": user.phone_number,
        "email": user.email,
        "role": user.role
    }


async def get_user_id(authorize: AuthJWT = Depends()):
    try:
        authorize.jwt_required()
        user_id = authorize.get_jwt_subject()
        return user_id
    except MissingTokenError:
        raise HTTPException(
            status_code=401,
            detail="Not authorized"
        )
