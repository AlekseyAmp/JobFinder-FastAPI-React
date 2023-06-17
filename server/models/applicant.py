from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from config.database import Base


class Applicant(Base):
    __tablename__ = 'applicants'

    id = Column(Integer, primary_key=True, autoincrement=True)
    speciality = Column(String(255))
    salary = Column(Integer)
    experience = Column(Integer)
    resume_text = Column(String)
    phone_number = Column(String(50), unique=True)
    email = Column(String(50), unique=True)
    is_archived = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.now)

    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="applicant")

    feedback = relationship("Feedback", back_populates="applicant")
