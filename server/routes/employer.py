from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db

from dto.employer import Employer as EmployerDTO
from services.user import get_user_id
from services import employer as EmployerService


router = APIRouter()


@router.post("/employers")
async def create_employer(data: EmployerDTO, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return EmployerService.create_employer(data, db, user_id)


@router.get("/employers")
async def get_all_employers(db: Session = Depends(get_db)):
    return EmployerService.get_all_employers(db)


@router.patch("/employers/{employer_id}")
async def confirm_employer(employer_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return EmployerService.confirm_employer(employer_id, db, user_id)


@router.delete("/employers/{employer_id}")
async def delete_employer(employer_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return EmployerService.delete_employer(employer_id, db, user_id)
