from fastapi import HTTPException
from sqlalchemy.orm import Session

from models.employer import Employer
from models.user import User
from dto.employer import Employer as EmployerDTO
from utils.admin import is_admin
from utils.employer import is_employer
from utils.dto import check_data_on_empty


def get_employer_by_user_id(user_id: str, db: Session):
    employer = db.query(Employer).filter(
        Employer.user_id == user_id
    ).first()

    if not employer:
        raise HTTPException(
            status_code=404,
            detail="Employer not found"
        )

    return employer


def get_employer_by_employer_id(employer_id: str, db: Session):
    employer = db.query(Employer).filter(
        Employer.id == employer_id
    ).first()

    if not employer:
        raise HTTPException(
            status_code=404,
            detail="Employer not found"
        )

    return employer


def create_employer(data: EmployerDTO, db: Session, user_id: str):
    if not check_data_on_empty(data):
        raise HTTPException(
            status_code=400,
            detail="One or more field(s) is empty"
        )

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


def get_all_employers(db: Session):
    employers = db.query(Employer).all()
    return employers[::-1]


def confirm_employer(employer_id, db: Session, user_id: str):
    if not is_admin(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    employer = get_employer_by_employer_id(employer_id, db)

    user = db.query(User).filter(
        User.id == employer.user_id
    ).first()

    user.role = "employer"
    employer.is_confirmed = True

    db.commit()

    return {
        "message": "Employer is confirmed"
    }


def delete_employer(employer_id, db: Session, user_id: str):
    if not is_admin(user_id, db) and not is_employer(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    if is_employer(user_id, db):
        employer = get_employer_by_user_id(user_id, db)

        if str(employer.id) != employer_id:
            raise HTTPException(
                status_code=403,
                detail="Access denied"
            )

    user = db.query(User).filter(
        User.id == employer.user_id
    ).first()

    user.role = "user"

    db.delete(employer)
    db.commit()

    return {
        "message": "Employer is deleted"
    }
