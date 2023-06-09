from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db

from dto.applicant import Applicant as ApplicantDTO
from services.user import get_user_id
from services import applicant as ApplicantService


router = APIRouter()


@router.post("/applicants/create")
async def create_applicant(data: ApplicantDTO, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return ApplicantService.create_applicant(data, db, user_id)


@router.get("/applicants/{applicant_id}")
async def get_applicant_by_applicant_id(applicant_id: str, db: Session = Depends(get_db)):
    return ApplicantService.get_applicant_by_applicant_id(applicant_id, db)


@router.get("/applicants/user/{user_id}")
async def get_applicant_by_user_id(user_id: str = Depends(get_user_id), db: Session = Depends(get_db)):
    return ApplicantService.get_applicant_by_user_id(user_id, db)


@router.get("/applicants")
async def get_paginated_applicants(page: int, archived: bool, db: Session = Depends(get_db)):
    return ApplicantService.get_paginated_applicants(page, archived, db)


@router.patch("/applicants/in_archive/{applicant_id}")
async def in_archive_applicant(applicant_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return ApplicantService.in_archive_applicant(applicant_id, db, user_id)


@router.patch("/applicants/from_archive/{applicant_id}")
async def from_archive_applicant(applicant_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return ApplicantService.from_archive_applicant(applicant_id, db, user_id)


@router.delete("/applicants/delete/{applicant_id}")
async def delete_applicant(applicant_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return ApplicantService.delete_applicant(applicant_id, db, user_id)