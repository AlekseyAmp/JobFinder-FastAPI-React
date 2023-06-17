from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from models.applicant import Applicant
from models.user import User
from dto.applicant import Applicant as ApplicantDTO
from utils.admin import is_admin
from utils.applicant import is_applicant
from utils.dto import check_data_on_empty, check_salary_and_experience
from constants.filter_data import salary_filters_for_applicants, experience_filters_for_applicants


def create_applicant(data: ApplicantDTO, user_id: str, db: Session):
    if not check_data_on_empty(data):
        raise HTTPException(
            status_code=400,
            detail="One or more field(s) is empty"
        )
    
    salary = data.salary.strip()
    experience = data.experience.strip()

    if not check_salary_and_experience(salary, experience):
        raise HTTPException(
            status_code=400,
            detail="Salary or experience should consist only of numbers and should not be negative"
        )

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if user.role != "user":
        raise HTTPException(
            status_code=409,
            detail="You can't become applicant"
        )

    new_applicant = Applicant(
        speciality=data.speciality.strip(),
        salary=int(salary),
        experience=int(experience),
        resume_text=data.resume_text.strip(),
        phone_number=user.phone_number,
        email=user.email,
        user_id=user_id
    )

    user.role = "applicant"

    db.add(new_applicant)
    db.commit()

    return {
        "id": new_applicant.id,
        "speciality": new_applicant.speciality,
        "experience": new_applicant.experience,
        "salary": new_applicant.salary,
        "resume_text": new_applicant.resume_text,
        "is_active": new_applicant.is_archived
    }


def get_applicant_by_applicant_id(applicant_id: str, db: Session):
    applicant = db.query(Applicant).filter(
        Applicant.id == applicant_id
    ).first()

    if not applicant:
        raise HTTPException(
            status_code=404,
            detail="Applicant not found"
        )

    return applicant


def get_applicant_by_user_id(user_id: str, db: Session):
    applicant = db.query(Applicant).filter(
        Applicant.user_id == user_id
    ).first()

    if not applicant:
        raise HTTPException(
            status_code=404,
            detail="Applicant not found"
        )

    return applicant


def get_paginated_applicants(page: int, archived: bool, user_id: str, db: Session):
    # Кол-во элементов на странице
    items_on_page = 20
    # Смещение, от 0-20, от 20-40 и т.д
    offset = (page - 1) * items_on_page
    # Выборка из БД, с помощью смещение + ограничение 20
    applicants = db.query(Applicant).filter(
        Applicant.is_archived == archived,
    ).offset(offset).limit(items_on_page).all()
    return applicants[::-1]


def get_filtered_applicants(salary: str, experience: str, user_id: str, db: Session):
    salary_filter = salary_filters_for_applicants.get(salary)
    experience_filter = experience_filters_for_applicants.get(experience)

    applicants = db.query(Applicant).filter(
        Applicant.is_archived == False,
        salary_filter,
        experience_filter,
    ).all()

    return applicants[::-1]


def search_applicants(query: str, user_id: str, db: Session):
    search_results = db.query(Applicant).filter(
        func.lower(Applicant.speciality).contains(query.lower()),
        Applicant.is_archived == False
    ).all()

    return search_results[::-1]


def in_archive_applicant(applicant_id: str, user_id: str, db: Session):
    if not is_admin(user_id, db) and not is_applicant(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    applicant = get_applicant_by_applicant_id(applicant_id, db)

    if is_applicant(user_id, db):
        applicant = get_applicant_by_user_id(user_id, db)
        if str(applicant.id) != applicant_id:
            raise HTTPException(
                status_code=403,
                detail="Access denied"
            )

    if applicant.is_archived:
        raise HTTPException(
            status_code=404,
            detail="The summary is already in archive"
        )

    applicant.is_archived = True

    db.commit()

    return {
        "message": "Summary moved in archive"
    }


def from_archive_applicant(applicant_id: str, user_id: str, db: Session):
    if not is_admin(user_id, db) and not is_applicant(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    applicant = get_applicant_by_applicant_id(applicant_id, db)

    if is_applicant(user_id, db):
        applicant = get_applicant_by_user_id(user_id, db)
        if str(applicant.id) != applicant_id:
            raise HTTPException(
                status_code=403,
                detail="Access denied"
            )

    if not applicant.is_archived:
        raise HTTPException(
            status_code=404,
            detail="The summary is not in the archive"
        )

    applicant.is_archived = False

    db.commit()

    return {
        "message": "Summary removed from the archive"
    }


def delete_applicant(applicant_id: str, user_id: str, db: Session):
    if not is_admin(user_id, db) and not is_applicant(user_id, db):
        raise HTTPException(
            status_code=403,
            detail="No access rights"
        )

    if is_applicant(user_id, db):
        applicant = get_applicant_by_user_id(user_id, db)
        if str(applicant.id) != applicant_id:
            raise HTTPException(
                status_code=403,
                detail="Access denied"
            )

    applicant = get_applicant_by_applicant_id(applicant_id, db)

    user = db.query(User).filter(
        User.id == applicant.user_id
    ).first()

    user.role = "user"

    db.delete(applicant)
    db.commit()

    return {
        "message": "Employer is deleted"
    }
