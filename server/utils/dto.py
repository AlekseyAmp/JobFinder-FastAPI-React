from pydantic import BaseModel


def check_data_on_empty(data: BaseModel):
    for field in data.__fields__:
        value = getattr(data, field)
        if not value:
            return False
    return True


def check_salary_and_experience(salary: str, experience: str):
    if salary.isnumeric() and experience.isnumeric():
        if int(salary) >= 0 and int(experience) >= 0:
            return True

    return False
