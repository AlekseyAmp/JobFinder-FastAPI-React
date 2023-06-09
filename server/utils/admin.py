from sqlalchemy.orm import Session
from models.user import User


def is_admin(user_id: str, db: Session):
    admin = db.query(User).filter(
        User.id == user_id
    ).first()

    if admin.role == "admin":
        return True

    return False
