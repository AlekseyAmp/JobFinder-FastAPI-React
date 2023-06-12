from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db

from dto.vacancy import Vacancy as VacancyDTO
from services.user import get_user_id
from services import vacancy as VacancyService


router = APIRouter()


@router.post("/vacancies/create")
async def create_vacancy(data: VacancyDTO, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return VacancyService.create_vacancy(data, user_id, db)


@router.get("/vacancies/employer/{employer_id}")
async def get_vacancies_by_employer_id(employer_id: str, db: Session = Depends(get_db)):
    return VacancyService.get_vacancies_by_employer_id(employer_id, db)


@router.get("/vacancies")
async def get_paginated_vacancies(page: int, confirmed: bool, archived: bool, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return VacancyService.get_paginated_vacancies(page, confirmed, archived, user_id, db)


@router.get("/vacancies/search")
async def search_vacancies(query: str, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return VacancyService.search_vacancies(query, user_id, db)


@router.patch("/vacancies/confirm/{vacancy_id}")
async def confirm_vacancy(vacancy_id: str, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return VacancyService.confirm_vacancy(vacancy_id, user_id, db)


@router.patch("/vacancies/in_archive/{vacancy_id}")
async def in_archive_vacancy(vacancy_id: str, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return VacancyService.in_archive_vacancy(vacancy_id, user_id, db)


@router.patch("/vacancies/from_archive/{vacancy_id}")
async def from_archive_vacancy(vacancy_id: str, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return VacancyService.from_archive_vacancy(vacancy_id, user_id, db)


@router.delete("/vacancies/delete/{vacancy_id}")
async def delete_vacancy(vacancy_id: str, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return VacancyService.delete_vacancy(vacancy_id, user_id, db)
