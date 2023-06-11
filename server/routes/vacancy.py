from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db

from dto.vacancy import Vacancy as VacancyDTO
from services.user import get_user_id
from services import vacancy as VacancyService


router = APIRouter()


@router.post("/vacancies/create")
async def create_vacancy(data: VacancyDTO, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return VacancyService.create_vacancy(data, db, user_id)


@router.get("/vacancies/{vacancy_id}")
async def get_vacancy_by_vacancy_id(vacancy_id: str, db: Session = Depends(get_db)):
    return VacancyService.get_vacancy_by_vacancy_id(vacancy_id, db)


@router.get("/vacancies/employer/{employer_id}")
async def get_vacancies_by_employer_id(employer_id: str, db: Session = Depends(get_db)):
    return VacancyService.get_vacancies_by_employer_id(employer_id, db)


@router.get("/vacancies")
async def get_paginated_vacancies(page: int, confirmed: bool, archived: bool, db: Session = Depends(get_db)):
    return VacancyService.get_paginated_vacancies(page, confirmed, archived, db)


@router.patch("/vacancies/confirm/{vacancy_id}")
async def confirm_vacancy(vacancy_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return VacancyService.confirm_vacancy(vacancy_id, db, user_id)


@router.patch("/vacancies/in_archive/{vacancy_id}")
async def in_archive_vacancy(vacancy_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return VacancyService.in_archive_vacancy(vacancy_id, db, user_id)


@router.patch("/vacancies/from_archive/{vacancy_id}")
async def from_archive_vacancy(vacancy_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return VacancyService.from_archive_vacancy(vacancy_id, db, user_id)


@router.delete("/vacancies/delete/{vacancy_id}")
async def delete_vacancy(vacancy_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return VacancyService.delete_vacancy(vacancy_id, db, user_id)
