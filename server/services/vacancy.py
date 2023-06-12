from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from models.vacancy import Vacancy
from dto.vacancy import Vacancy as VacancyDTO
from services.employer import get_employer_by_user_id, get_employer_by_employer_id
from services.applicant import get_applicant_by_user_id
from utils.admin import is_admin
from utils.employer import is_employer
from utils.applicant import is_applicant
from utils.feedback import is_feedback
from utils.dto import check_data_on_empty


def create_vacancy(data: VacancyDTO, user_id: str, db: Session):
    if not is_admin(user_id, db) and not is_employer(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    if not check_data_on_empty(data):
        raise HTTPException(
            status_code=400,
            detail="One or more field(s) is empty"
        )

    employer = get_employer_by_user_id(user_id, db)

    new_vacancy = Vacancy(
        name=data.name.strip().title(),
        description=data.description.strip(),
        place=data.place.strip(),
        salary=data.salary.strip().replace(" ", "."),
        experience=data.experience,
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
        "experience": new_vacancy.experience,
        "tags": new_vacancy.tags,
        "is_confirmed": new_vacancy.is_confirmed
    }


def get_vacancy_by_vacancy_id(vacancy_id: str, db: Session):
    vacancy = db.query(Vacancy).filter(
        Vacancy.id == vacancy_id
    ).first()

    if not vacancy:
        raise HTTPException(
            status_code=403,
            detail="Vacancy not found"
        )

    return vacancy


def get_vacancies_by_employer_id(employer_id: str, db: Session):
    vacancies = db.query(Vacancy).filter(
        Vacancy.employer_id == employer_id
    ).all()

    return vacancies[::-1]


def get_paginated_vacancies(page: int, confirmed: bool, archived: bool, user_id: str, db: Session):
    vacancies_arr = []
    # Кол-во элементов на странице
    items_on_page = 20
    # Смещение, от 0-20, от 20-40 и т.д
    offset = (page - 1) * items_on_page
    # Выборка из БД, с помощью смещение + ограничение 20
    vacancies = db.query(Vacancy).filter(
        Vacancy.is_confirmed == confirmed,
        Vacancy.is_archived == archived
    ).offset(offset).limit(items_on_page).all()

    feedback = False
    for vacancy in vacancies:
        if is_applicant(user_id, db):
            applicant = get_applicant_by_user_id(user_id, db)
            feedback = is_feedback(applicant.id, db)

        employer = get_employer_by_employer_id(vacancy.employer_id, db)

        vacancy_dict = {
            "id": vacancy.id,
            "company": employer.company_name,
            "name": vacancy.name,
            "description": vacancy.description,
            "place": vacancy.place,
            "salary": vacancy.salary,
            "experience": vacancy.experience,
            "tags": vacancy.tags,
            "created_at": vacancy.created_at,
            "is_confirmed": vacancy.is_confirmed,
            "is_archived": vacancy.is_archived,
            "is_feedback": feedback
        }
        vacancies_arr.append(vacancy_dict)

    return vacancies_arr


def search_vacancies(query: str, user_id: str, db: Session):
    search_results = []

    vacancies = db.query(Vacancy).filter(
        func.lower(Vacancy.name).contains(query.lower())
    ).all()

    feedback = False
    for vacancy in vacancies:
        if is_applicant(user_id, db):
            applicant = get_applicant_by_user_id(user_id, db)
            feedback = is_feedback(applicant.id, db)

        employer = get_employer_by_employer_id(vacancy.employer_id, db)

        vacancy_dict = {
            "id": vacancy.id,
            "company": employer.company_name,
            "name": vacancy.name,
            "description": vacancy.description,
            "place": vacancy.place,
            "salary": vacancy.salary,
            "experience": vacancy.experience,
            "tags": vacancy.tags,
            "created_at": vacancy.created_at,
            "is_confirmed": vacancy.is_confirmed,
            "is_archived": vacancy.is_archived,
            "is_feedback": feedback
        }
        search_results.append(vacancy_dict)

    return search_results


def confirm_vacancy(vacancy_id, user_id: str, db: Session):
    if not is_admin(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    vacancy = get_vacancy_by_vacancy_id(vacancy_id, db)

    vacancy.is_confirmed = True
    vacancy.is_archived = False

    db.commit()

    return {
        "message": "Vacancy is confirmed"
    }


def in_archive_vacancy(vacancy_id, user_id: str, db: Session):
    if not is_admin(user_id, db) and not is_employer(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    vacancy = get_vacancy_by_vacancy_id(vacancy_id, db)

    if is_employer(user_id, db):
        employer = get_employer_by_user_id(user_id, db)
        if vacancy.employer_id != employer.id:
            raise HTTPException(
                status_code=403,
                detail="Access denied"
            )

    if vacancy.is_archived:
        raise HTTPException(
            status_code=404,
            detail="The vacancy is already in archive"
        )

    vacancy.is_archived = True

    db.commit()

    return {
        "message": "Vacancy moved in archive"
    }


def from_archive_vacancy(vacancy_id, user_id: str, db: Session):
    if not is_admin(user_id, db) and not is_employer(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    vacancy = get_vacancy_by_vacancy_id(vacancy_id, db)

    if is_employer(user_id, db):
        employer = get_employer_by_user_id(user_id, db)
        if vacancy.employer_id != employer.id:
            raise HTTPException(
                status_code=403,
                detail="Access denied"
            )

    if not vacancy.is_archived:
        raise HTTPException(
            status_code=404,
            detail="The vacancy is not in the archive"
        )

    vacancy.is_archived = False

    db.commit()

    return {
        "message": "Vacancy removed from the archive"
    }


def delete_vacancy(vacancy_id, db: Session, user_id: str):
    if not is_admin(user_id, db) and not is_employer(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    vacancy = get_vacancy_by_vacancy_id(vacancy_id, db)

    if is_employer(user_id, db):
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
