from sqlalchemy.orm import Session
from models.user import User


def is_employer(user_id: str, db: Session):
    emoloyer = db.query(User).filter(
        User.id == user_id
    ).first()

    if emoloyer.role == "employer":
        return True

    return False
