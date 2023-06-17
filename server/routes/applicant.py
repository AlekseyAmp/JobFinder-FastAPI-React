from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db

from dto.applicant import Applicant as ApplicantDTO
from services.user import get_user_id
from services import applicant as ApplicantService


router = APIRouter()


@router.post("/applicants/create")
async def create_applicant(data: ApplicantDTO, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return ApplicantService.create_applicant(data, user_id, db)


@router.get("/applicants/user/{user_id}")
async def get_applicant_by_user_id(user_id: str, db: Session = Depends(get_db)):
    return ApplicantService.get_applicant_by_user_id(user_id, db)


@router.get("/applicants")
async def get_paginated_applicants(page: int, archived: bool, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return ApplicantService.get_paginated_applicants(page, archived, user_id, db)


@router.get("/applicants/filter")
async def get_filtered_applicants(salary: str, experience: str, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return ApplicantService.get_filtered_applicants(salary, experience, user_id, db)


@router.get("/applicants/search")
async def search_applicants(query: str, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return ApplicantService.search_applicants(query, user_id, db)


@router.patch("/applicants/in_archive/{applicant_id}")
async def in_archive_applicant(applicant_id: str, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return ApplicantService.in_archive_applicant(applicant_id, user_id, db)


@router.patch("/applicants/from_archive/{applicant_id}")
async def from_archive_applicant(applicant_id: str, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return ApplicantService.from_archive_applicant(applicant_id, user_id, db)


@router.delete("/applicants/delete/{applicant_id}")
async def delete_applicant(applicant_id: str, user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return ApplicantService.delete_applicant(applicant_id, user_id, db)
