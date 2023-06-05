from fastapi import Response, HTTPException
from sqlalchemy.orm import Session

from config.jwt_config import AuthJWT
from config.settings import settings

from models.user import User
from dto.auth import (
    Register as RegisterDTO,
    Login as LoginDTO
)
from services.employer import get_employer_by_user_id
from utils.auth import (
    hash_password,
    verify_password,
    is_valid_email,
    is_valid_name_surname,
    create_access_token,
    create_refresh_token
)
from utils.dto import check_data_on_empty
from utils.employer import is_employer


def create_user(data: RegisterDTO, response: Response, db: Session, authorize: AuthJWT):
    if not check_data_on_empty(data):
        raise HTTPException(
            status_code=400,
            detail="One or more field(s) is empty"
        )

    if not is_valid_name_surname(data.name, data.surname):
        raise HTTPException(
            status_code=400,
            detail="Name or surname can only contain letters"
        )

    if not is_valid_email(data.email):
        raise HTTPException(
            status_code=400,
            detail="Incorrect email address"
        )

    phone_exists = db.query(User).filter(
        User.phone_number == data.phone_number
    ).first()

    email_exists = db.query(User).filter(
        User.email == data.email
    ).first()

    if phone_exists or email_exists:
        raise HTTPException(
            status_code=409,
            detail="The user already exists"
        )

    new_user = User(
        name=data.name.strip(),
        surname=data.surname.strip(),
        email=data.email.lower().strip(),
        phone_number=data.phone_number.strip(),
        password=hash_password(data.password),
    )

    db.add(new_user)
    db.commit()

    employer_id, applicant_id = None, None
    access_token = create_access_token(authorize, str(new_user.id), employer_id, applicant_id)
    refresh_token = create_refresh_token(authorize, str(new_user.id), employer_id, applicant_id)

    response.set_cookie("access_token",
                        access_token,
                        settings.ACCESS_TOKEN_EXPIRES_IN * 60,
                        settings.ACCESS_TOKEN_EXPIRES_IN * 60,
                        "/",
                        None,
                        False,
                        True,
                        "lax"
                        )

    response.set_cookie("refresh_token",
                        refresh_token,
                        settings.REFRESH_TOKEN_EXPIRES_IN * 60,
                        settings.REFRESH_TOKEN_EXPIRES_IN * 60,
                        "/",
                        None,
                        False,
                        True,
                        "lax"
                        )

    return {
        "id": new_user.id,
        "name": new_user.name,
        "surname": new_user.surname,
        "phone_number": new_user.phone_number,
        "email": new_user. email,
        "role": new_user.role,
        "access_token": access_token,
        "refresh_token": refresh_token
    }


def login_user(data: LoginDTO, response: Response, db: Session, authorize: AuthJWT):
    user = db.query(User).filter(
        User.phone_number == data.phone_number
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    if not verify_password(data.password, user.password):
        raise HTTPException(
            status_code=400,
            detail="Wrong email or password"
        )

    employer_id, applicant_id = None, None
    if is_employer(user.id, db):
        employer = get_employer_by_user_id(user.id, db)
        employer_id = str(employer.id)

    access_token = create_access_token(authorize, str(user.id), employer_id, applicant_id)
    refresh_token = create_refresh_token(authorize, str(user.id), employer_id, applicant_id)

    response.set_cookie("access_token",
                        access_token,
                        settings.ACCESS_TOKEN_EXPIRES_IN * 60,
                        settings.ACCESS_TOKEN_EXPIRES_IN * 60,
                        "/",
                        None,
                        False,
                        True,
                        "lax"
                        )

    response.set_cookie("refresh_token",
                        refresh_token,
                        settings.REFRESH_TOKEN_EXPIRES_IN * 60,
                        settings.REFRESH_TOKEN_EXPIRES_IN * 60,
                        "/",
                        None,
                        False,
                        True,
                        "lax"
                        )

    return {
        "id": user.id,
        "name": user.name,
        "surname": user.surname,
        "phone_number": user.phone_number,
        "email": user.email,
        "role": user.role,
        "access_token": access_token,
        "refresh_token": refresh_token
    }


def refresh_token(authorize: AuthJWT, response: Response, user_id: str):
    access_token = create_access_token(authorize, user_id)

    response.set_cookie("access_token",
                        access_token,
                        settings.ACCESS_TOKEN_EXPIRES_IN * 60,
                        settings.ACCESS_TOKEN_EXPIRES_IN * 60,
                        "/",
                        None,
                        False,
                        True,
                        "lax")

    return access_token


def logout_user(response: Response, authorize: AuthJWT):
    authorize.unset_jwt_cookies()
    response.delete_cookie("access_token")
    response.delete_cookie("refresh_token")
    return {
        "message": "You're logout"
    }
