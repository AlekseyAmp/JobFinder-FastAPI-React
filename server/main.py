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
    auth as AuthRouter,
    user as UserRouter,
    employer as EmployerRouter,
    vacancy as VacancyRouter,
    applicant as ApplicantRouter,
    feedback as FeedbackRouter,
)


app = FastAPI(title="JobFinder", version="0.1")


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

app.include_router(AuthRouter.router, tags=['auth'], prefix='/api')
app.include_router(UserRouter.router, tags=['users'], prefix='/api')
app.include_router(EmployerRouter.router, tags=['employers'], prefix='/api')
app.include_router(VacancyRouter.router, tags=['vacancies'], prefix='/api')
app.include_router(ApplicantRouter.router, tags=['applicants'], prefix='/api')
app.include_router(FeedbackRouter.router, tags=['feedbacks'], prefix='/api')


@app.get("/")
def root():
    return {"message": "Go to /docs"}
