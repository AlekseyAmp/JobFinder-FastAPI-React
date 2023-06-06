from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from config.database import Base


class Employer(Base):
    __tablename__ = 'employers'

    id = Column(Integer, primary_key=True, autoincrement=True)
    company_name = Column(String(255))
    company_description = Column(String)
    contact = Column(String(255))
    website = Column(String(255))
    is_confirmed = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.now)

    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="employer")

    vacancy = relationship("Vacancy", back_populates="employer")

    feedback = relationship("Feedback", back_populates="employer")
