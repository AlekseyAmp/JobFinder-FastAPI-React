from fastapi import HTTPException
from sqlalchemy.orm import Session

from schemas.vacancy_schema import VacancyForm
from models.vacancy import Vacancy
from models.user import User
from utils.admin_utils import is_admin
from utils.schema_utils import check_form_on_empty


async def create_vacancy(data: VacancyForm, db: Session, user_id: str):
    if not check_form_on_empty(data):
        raise HTTPException(
            status_code=400,
            detail="One or more field(s) is empty"
        )

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if user.role != "employer" and user.role != "admin":
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    new_vacancy = Vacancy(
        name=data.name.strip(),
        description=data.description.strip(),
        place=data.place.strip(),
        salary=data.salary.strip().replace(" ", "."),
        tags=data.tags
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
    return vacancies


async def confirm_vacancy(vacancy_id, db: Session, user_id: str):
    if not is_admin(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    vacancy = db.query(Vacancy).filter(
        Vacancy.id == vacancy_id
    ).first()

    vacancy.is_confirmed = True

    db.commit()

    return {
        "message": "Vacancy is confirmed"
    }


async def delete_vacancy(vacancy_id, db: Session, user_id: str):
    if not is_admin(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    vacancy = db.query(Vacancy).filter(
        Vacancy.id == vacancy_id
    ).first()

    db.delete(vacancy)
    db.commit()

    return {
        "message": "Vacancy is deleted"
    }
