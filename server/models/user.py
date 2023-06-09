from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from config.database import Base


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    surname = Column(String(255))
    phone_number = Column(String(50), unique=True)
    email = Column(String(50), unique=True)
    password = Column(String)
    role = Column(String(30), default='user')
    created_at = Column(DateTime, default=datetime.now)

    employer = relationship("Employer", back_populates="user")
    applicant = relationship("Applicant", back_populates="user")
