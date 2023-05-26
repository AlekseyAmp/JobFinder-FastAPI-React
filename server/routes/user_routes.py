from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db
from services import user_services as u_s


router = APIRouter()


@router.get("/users/me")
async def get_user_info(db: Session = Depends(get_db), user_id: str = Depends(u_s.get_user_id)):
    return await u_s.get_user_info(db, user_id)
