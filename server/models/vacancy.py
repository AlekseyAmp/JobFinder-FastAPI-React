from sqlalchemy import Column, Integer, String, Boolean, DateTime, ARRAY, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from config.database import Base


class Vacancy(Base):
    __tablename__ = 'vacancies'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255))
    description = Column(String)
    place = Column(String(255))
    salary = Column(Integer)
    experience = Column(Integer)
    tags = Column(ARRAY(String(50)))
    is_confirmed = Column(Boolean, default=False)
    is_archived = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now)

    employer_id = Column(Integer, ForeignKey('employers.id'))
    employer = relationship("Employer", back_populates="vacancy")

    feedback = relationship("Feedback", back_populates="vacancy")
