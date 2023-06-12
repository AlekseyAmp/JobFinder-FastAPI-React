from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db

from dto.feedback import Feedback as FeedbackDTO
from services.user import get_user_id
from services import feedback as FeedbackService


router = APIRouter()


@router.post("/feedbacks/create")
async def create_feedback(data: FeedbackDTO, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return FeedbackService.create_feedback(data, user_id, db)


@router.get("/feedbacks/vacancy/{vacancy_id}")
async def get_feedbacks_by_vacancy_id(vacancy_id: str, db: Session = Depends(get_db)):
    return FeedbackService.get_feedbacks_by_vacancy_id(vacancy_id, db)
