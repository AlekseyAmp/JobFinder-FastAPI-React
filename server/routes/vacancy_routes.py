from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db
from schemas.vacancy_schema import VacancyForm
from services.user_services import get_user_id
from services import vacancy_services as v_s


router = APIRouter()


@router.post("/vacancies")
async def create_employer(data: VacancyForm, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return await v_s.create_vacancy(data, db, user_id)


@router.get("/vacancies")
async def get_all_vacancies(db: Session = Depends(get_db)):
    return await v_s.get_all_vacancies(db)


@router.patch("/vacancies/{vacancy_id}")
async def confirm_vacancy(vacancy_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return await v_s.confirm_vacancy(vacancy_id, db, user_id)


@router.delete("/vacancies/{vacancy_id}")
async def delete_vacancy(vacancy_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return await v_s.delete_vacancy(vacancy_id, db, user_id)
