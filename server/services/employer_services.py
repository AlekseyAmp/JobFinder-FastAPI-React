from fastapi import HTTPException
from sqlalchemy.orm import Session

from schemas.employer_schema import EmployerData
from models.employer import Employer
from utils.admin_utils import is_admin


async def create_employer(data: EmployerData, db: Session, user_id: str):
    employer_exists = db.query(Employer).filter(
        Employer.user_id == user_id
    ).first()

    if employer_exists:
        raise HTTPException(
            status_code=409,
            detail='You are already an employer'
        )

    new_employer = Employer(
        company_name=data.company_name,
        company_description=data.company_description,
        user_id=user_id
    )

    db.add(new_employer)
    db.commit()

    return {
        "id": new_employer.id,
        "company_name": new_employer.company_name,
        "company_description": new_employer.company_description
    }


async def get_all_employers(db: Session, user_id: str):
    if is_admin(user_id, db):
        employers = db.query(Employer).all()
        return employers


async def confirm_employer(employer_id, db: Session, user_id: str):
    if is_admin(user_id, db):
        employer = db.query(Employer).filter(
            Employer.id == employer_id
        ).first()

        employer.isConfirmed = True

        db.commit()

        return {
            "isConfirmed": employer.isConfirmed
        }
