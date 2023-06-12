from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db

from dto.employer import Employer as EmployerDTO
from services.user import get_user_id
from services import employer as EmployerService


router = APIRouter()


@router.post("/employers/create")
async def create_employer(data: EmployerDTO, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return EmployerService.create_employer(data, user_id, db)


@router.get("/employers/user/{user_id}")
async def get_employer_by_user_id(user_id: str, db: Session = Depends(get_db)):
    return EmployerService.get_employer_by_user_id(user_id, db)


@router.get("/employers/search")
async def search_employers(query: str, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return EmployerService.search_employers(query, user_id, db)


@router.get("/employers")
async def get_paginated_employers(page: int, confirmed: bool, user_id: str = Depends(get_user_id),  db: Session = Depends(get_db)):
    return EmployerService.get_paginated_employers(page, confirmed, user_id, db)


@router.patch("/employers/confirm/{employer_id}")
async def confirm_employer(employer_id: str, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return EmployerService.confirm_employer(employer_id, user_id, db)


@router.delete("/employers/delete/{employer_id}")
async def delete_employer(employer_id: str, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return EmployerService.delete_employer(employer_id, user_id, db)
