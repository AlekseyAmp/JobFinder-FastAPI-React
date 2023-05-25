from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from config.database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    surname = Column(String(255))
    email = Column(String(255), unique=True)
    phone_number = Column(String(50))
    password = Column(String)
    role = Column(String(10), default='applicant')
    created_at = Column(DateTime, default=datetime.utcnow)
