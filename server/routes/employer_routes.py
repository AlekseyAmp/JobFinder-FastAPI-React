from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.database import get_db
from schemas.employer_schema import EmployerData
from services.user_services import get_user_id
from services import employer_services as e_s


router = APIRouter()


@router.post("/employers/create")
async def create_employer(data: EmployerData, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return await e_s.create_employer(data, db, user_id)


@router.get("/employers")
async def get_all_employers(db: Session = Depends(get_db)):
    return await e_s.get_all_employers(db)


@router.patch("/employers/{employer_id}")
async def confirm_employer(employer_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return await e_s.confirm_employer(employer_id, db, user_id)


@router.delete("/employers/{employer_id}")
async def delete_employer(employer_id: str, db: Session = Depends(get_db), user_id: str = Depends(get_user_id)):
    return await e_s.delete_employer(employer_id, db, user_id)
