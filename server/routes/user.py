from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db

from services import user as UserService


router = APIRouter()


@router.get("/users/me")
async def get_user_info(db: Session = Depends(get_db), user_id: str = Depends(UserService.get_user_id)):
    return UserService.get_user_info(db, user_id)
