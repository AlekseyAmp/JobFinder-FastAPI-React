from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from config.database import Base


class Applicant(Base):
    __tablename__ = 'applicants'

    id = Column(Integer, primary_key=True, autoincrement=True)
    speciality = Column(String(255))
    experience = Column(String(255))
    salary = Column(String(255))
    resume_text = Column(String)
    created_at = Column(DateTime, default=datetime.now)

    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="applicant")

    feedback = relationship("Feedback", back_populates="applicant")
