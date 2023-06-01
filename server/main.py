from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.database import engine
from models import (
    user,
    employer,
    applicant,
    vacancy,
    feedback,
)
from routes import (
    auth_routes,
    user_routes,
    employer_routes,
    vacancy_routes,
)


app = FastAPI()


user.Base.metadata.create_all(bind=engine)
employer.Base.metadata.create_all(bind=engine)
applicant.Base.metadata.create_all(bind=engine)
vacancy.Base.metadata.create_all(bind=engine)
feedback.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_routes.router, tags=['auth'], prefix='/api')
app.include_router(user_routes.router, tags=['users'], prefix='/api')
app.include_router(employer_routes.router, tags=['employers'], prefix='/api')
app.include_router(vacancy_routes.router, tags=['vacancies'], prefix='/api')


@app.get("/")
def root():
    return {"message": "Go to /docs"}
