from fastapi import APIRouter, Response, Depends
from sqlalchemy.orm import Session

from config.database import get_db
from config.jwt_config import AuthJWT

from dto.auth import (
    Register as RegisterDTO, 
    Login as LoginDTO
)
from services.user import get_user_id
from services import auth as AuthService


router = APIRouter()


@router.post("/auth/register")
async def register(data: RegisterDTO, response: Response, db: Session = Depends(get_db), authorize: AuthJWT = Depends()):
    return AuthService.create_user(data, response, db, authorize)


@router.post("/auth/login")
async def login(data: LoginDTO, response: Response, db: Session = Depends(get_db), authorize: AuthJWT = Depends()):
    return AuthService.login_user(data, response, db, authorize)


@router.get("/auth/refresh_token")
async def refresh_token(response: Response, authorize: AuthJWT = Depends(), user_id: str = Depends(get_user_id)):
    return AuthService.refresh_token(response, authorize, user_id)


@router.get("/auth/logout")
async def logout(response: Response, authorize: AuthJWT = Depends()):
    return AuthService.logout_user(response, authorize)
