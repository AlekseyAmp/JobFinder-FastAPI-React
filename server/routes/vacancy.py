from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db

from dto.vacancy import Vacancy as VacancyDTO
from services.user import get_user_id
from services import vacancy as VacancyService


router = APIRouter()


@router.post("/vacancies")
async def create_employer(data: VacancyDTO, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return VacancyService.create_vacancy(data, db, user_id)


@router.get("/vacancies/{vacancy_id}")
async def get_vacancy(vacancy_id: str, db: Session = Depends(get_db)):
    return VacancyService.get_vacancy(vacancy_id, db)


@router.get("/vacancies/{employer_id}")
async def get_vacancies_by_employer(employer_id: str, db: Session = Depends(get_db)):
    return VacancyService.get_vacancies_by_employer(employer_id, db)


@router.get("/vacancies")
async def get_all_vacancies(db: Session = Depends(get_db)):
    return VacancyService.get_all_vacancies(db)


@router.patch("/vacancies/{vacancy_id}")
async def confirm_vacancy(vacancy_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return VacancyService.confirm_vacancy(vacancy_id, db, user_id)


@router.delete("/vacancies/{vacancy_id}")
async def delete_vacancy(vacancy_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return VacancyService.delete_vacancy(vacancy_id, db, user_id)
