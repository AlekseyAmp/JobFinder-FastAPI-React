from fastapi import HTTPException
from sqlalchemy.orm import Session

from models.feedback import Feedback
from dto.feedback import Feedback as FeedbackDTO
from services.applicant import get_applicant_by_applicant_id
from services.vacancy import get_vacancy_by_vacancy_id
from utils.applicant import is_applicant


def create_feedback(data: FeedbackDTO, user_id: str, db: Session):
    if not is_applicant(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    get_applicant_by_applicant_id(data.applicant_id, db)
    vacancy = get_vacancy_by_vacancy_id(data.vacancy_id, db)

    if not vacancy.is_confirmed:
        raise HTTPException(
            status_code=409,
            detail="The vacancy not is confirmed"
        )

    if vacancy.is_archived:
        raise HTTPException(
            status_code=409,
            detail="The vacancy in the archive"
        )

    feedback_exists = db.query(Feedback).filter(
        Feedback.applicant_id == data.applicant_id,
        Feedback.vacancy_id == data.vacancy_id
    ).first()

    if feedback_exists:
        raise HTTPException(
            status_code=409,
            detail="The feedback already exists"
        )

    new_feedback = Feedback(
        applicant_id=data.applicant_id,
        vacancy_id=data.vacancy_id
    )

    db.add(new_feedback)
    db.commit()

    return {
        "message": "Feedback was be create"
    }


def get_feedbacks_by_vacancy_id(vacancy_id: str, db: Session):
    feedbacks_arr = []

    feedbacks = db.query(Feedback).filter(
        Feedback.vacancy_id == vacancy_id
    ).all()

    for feedback in feedbacks:
        applicant = get_applicant_by_applicant_id(feedback.applicant_id, db)
        feedback_dict = {
            "id": feedback.id,
            "created_at": feedback.created_at,
            "applicant": applicant,
        }
        feedbacks_arr.append(feedback_dict)

    return feedbacks_arr
