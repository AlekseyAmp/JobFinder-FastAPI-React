from fastapi import APIRouter, Response, Depends
from sqlalchemy.orm import Session

from config.database import get_db
from config.jwt_config import AuthJWT
from schemas.auth_schema import RegisterForm, LoginForm
from services.user_services import get_user_id
from services import auth_services as a_s


router = APIRouter()


@router.post("/auth/register")
async def register(data: RegisterForm, response: Response, db: Session = Depends(get_db), authorize: AuthJWT = Depends()):
    return await a_s.create_user(data, response, db, authorize)


@router.post("/auth/login")
async def login(data: LoginForm, response: Response, db: Session = Depends(get_db), authorize: AuthJWT = Depends()):
    return await a_s.login_user(data, response, db, authorize)


@router.get("/auth/refresh_token")
async def refresh_token(response: Response, authorize: AuthJWT = Depends(), user_id: str = Depends(get_user_id)):
    return await a_s.refresh_token(authorize, response, user_id)


@router.get("/auth/logout")
async def logout(response: Response, authorize: AuthJWT = Depends()):
    return await a_s.logout_user(response, authorize)
