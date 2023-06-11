from sqlalchemy.orm import Session
from models.feedback import Feedback


def is_feedback(applicant_id: str, db: Session):
    feedback = db.query(Feedback).filter(
        Feedback.applicant_id == applicant_id
    ).first()

    if feedback:
        return True

    return False
