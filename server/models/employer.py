from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship

from config.database import Base


class Employer(Base):
    __tablename__ = 'employers'

    id = Column(Integer, primary_key=True, autoincrement=True)
    company_name = Column(String(255))
    company_description = Column(String)
    isConfirmed = Column(Boolean, default=False)

    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="employer")
