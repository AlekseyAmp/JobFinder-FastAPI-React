from pydantic import BaseSettings
from dotenv import load_dotenv
import os


load_dotenv()


class Settings(BaseSettings):
    DATABASE_URL: str = os.environ["DATABASE_URL"]
    DATABASE_NAME: str = os.environ["DATABASE_NAME"]
    JWT_PUBLIC_KEY: str = os.environ["JWT_PUBLIC_KEY"]
    JWT_PRIVATE_KEY: str = os.environ["JWT_PRIVATE_KEY"]
    JWT_ALGORITHM: str = os.environ["JWT_ALGORITHM"]
    REFRESH_TOKEN_EXPIRES_IN: int = os.environ["REFRESH_TOKEN_EXPIRES_IN"]
    ACCESS_TOKEN_EXPIRES_IN: int = os.environ["ACCESS_TOKEN_EXPIRES_IN"]


settings = Settings()
