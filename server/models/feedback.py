from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from config.database import Base


class Feedback(Base):
    __tablename__ = 'feedback'

    id = Column(Integer, primary_key=True, autoincrement=True)
    created_at = Column(DateTime, default=datetime.now)

    applicant_id = Column(Integer, ForeignKey('applicants.id'))
    applicant = relationship("Applicant", back_populates="feedback")

    employer_id = Column(Integer, ForeignKey('employers.id'))
    employer = relationship("Employer", back_populates="feedback")
