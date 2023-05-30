from fastapi import HTTPException
from sqlalchemy.orm import Session

from schemas.employer_schema import EmployerData
from models.employer import Employer
from models.user import User
from utils.admin_utils import is_admin


async def create_employer(data: EmployerData, db: Session, user_id: str):
    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if user.role == "notConfirmedEmployer":
        raise HTTPException(
            status_code=409,
            detail='You have already applied for an employer'
        )

    if user.role == "employer":
        raise HTTPException(
            status_code=409,
            detail='You are already an employer'
        )

    new_employer = Employer(
        company_name=data.company_name.strip(),
        company_description=data.company_description.strip(),
        user_id=user_id
    )

    user.role = "notConfirmedEmployer"

    db.add(new_employer)
    db.commit()

    return {
        "id": new_employer.id,
        "company_name": new_employer.company_name,
        "company_description": new_employer.company_description,
        "is_confirmed": new_employer.is_confirmed
    }


async def get_all_employers(db: Session):
    employers = db.query(Employer).all()
    return employers[::-1]


async def confirm_employer(employer_id, db: Session, user_id: str):
    if is_admin(user_id, db):
        employer = db.query(Employer).filter(
            Employer.id == employer_id
        ).first()

        user = db.query(User).filter(
            User.id == Employer.user_id
        ).first()

        employer.is_confirmed = True

        user.role = "employer"

        db.commit()

        return {
            "message": "Employer is confirmed"
        }


async def delete_employer(employer_id, db: Session, user_id: str):
    if is_admin(user_id, db):
        employer = db.query(Employer).filter(
            Employer.id == employer_id
        ).first()

        user = db.query(User).filter(
            User.id == Employer.user_id
        ).first()

        user.role = "applicant"

        db.delete(employer)
        db.commit()

        return {
            "message": "Employer is deleted"
        }
