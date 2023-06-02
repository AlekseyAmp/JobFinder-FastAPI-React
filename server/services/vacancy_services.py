from fastapi import HTTPException
from sqlalchemy.orm import Session

from schemas.vacancy_schema import VacancyForm
from models.vacancy import Vacancy
from services.employer_services import get_employer_by_user_id
from utils.admin_utils import is_admin
from utils.employer_utils import is_employer
from utils.schema_utils import check_form_on_empty


def get_vacancy(vacancy_id: str, db: Session):
    vacancy = db.query(Vacancy).filter(
        Vacancy.id == vacancy_id
    ).first()

    if not vacancy:
        raise HTTPException(
            status_code=403,
            detail="Vacancy not found"
        )

    return vacancy


async def create_vacancy(data: VacancyForm, db: Session, user_id: str):
    if not is_admin(user_id, db) and not is_employer(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    if not check_form_on_empty(data):
        raise HTTPException(
            status_code=400,
            detail="One or more field(s) is empty"
        )

    employer = get_employer_by_user_id(user_id, db)

    new_vacancy = Vacancy(
        name=data.name.strip(),
        description=data.description.strip(),
        place=data.place.strip(),
        salary=data.salary.strip().replace(" ", "."),
        tags=data.tags,
        employer_id=employer.id
    )

    db.add(new_vacancy)
    db.commit()

    return {
        "id": new_vacancy.id,
        "name": new_vacancy.name,
        "description": new_vacancy.description,
        "place": new_vacancy.place,
        "salary": new_vacancy.salary,
        "tags": new_vacancy.tags,
        "is_confirmed": new_vacancy.is_confirmed
    }


async def get_all_vacancies(db: Session):
    vacancies = db.query(Vacancy).all()
    return vacancies[::-1]


async def confirm_vacancy(vacancy_id, db: Session, user_id: str):
    if not is_admin(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    vacancy = get_vacancy(vacancy_id, db)

    vacancy.is_confirmed = True

    db.commit()

    return {
        "message": "Vacancy is confirmed"
    }


async def delete_vacancy(vacancy_id, db: Session, user_id: str):
    if not is_admin(user_id, db) and not is_employer(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    vacancy = get_vacancy(vacancy_id, db)

    if not is_admin(user_id, db):
        employer = get_employer_by_user_id(user_id, db)

        if vacancy.employer_id != employer.id:
            raise HTTPException(
                status_code=403,
                detail="Access denied"
            )

    db.delete(vacancy)
    db.commit()

    return {
        "message": "Vacancy is deleted"
    }
