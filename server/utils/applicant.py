from sqlalchemy.orm import Session
from models.user import User


def is_applicant(user_id: str, db: Session):
    applicant = db.query(User).filter(
        User.id == user_id
    ).first()

    if applicant.role == "applicant":
        return True

    return False
