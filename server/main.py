from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.database import engine
from models import user
from routes import (
    auth_routes
)


app = FastAPI()


user.Base.metadata.create_all(bind=engine)


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


@app.get("/")
def root():
    return {"message": "Go to /docs"}
