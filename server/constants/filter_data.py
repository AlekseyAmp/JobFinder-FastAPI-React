from sqlalchemy import and_

from models.vacancy import Vacancy
from models.applicant import Applicant

salary_filters_for_vacancy = {
    "25-59": and_(Vacancy.salary.between(25000, 59000)),
    "60-109": and_(Vacancy.salary.between(60000, 109000)),
    "110-159": and_(Vacancy.salary.between(110000, 159000)),
    "160": Vacancy.salary >= 160000
}

experience_filters_for_vacancy = {
    "0": Vacancy.experience == "0",
    "1-3": and_(Vacancy.experience.between(1, 3)),
    "4-7": and_(Vacancy.experience.between(4, 7)),
    "8": Vacancy.experience >= 8
}

salary_filters_for_applicants = {
    "25-59": and_(Applicant.salary.between(25000, 59000)),
    "60-109": and_(Applicant.salary.between(60000, 109000)),
    "110-159": and_(Applicant.salary.between(110000, 159000)),
    "160": Applicant.salary >= 160000
}

experience_filters_for_applicants = {
    "0": Applicant.experience == "0",
    "1-3": and_(Applicant.experience.between(1, 3)),
    "4-7": and_(Applicant.experience.between(4, 7)),
    "8": Applicant.experience >= 8
}
