from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.notification import router as notification_router
from app.db.database import create_tables

from app.routes.auth import router as auth_router
from app.routes.project import router as project_router
from app.routes.task import router as task_router
from app.routes.dashboard import router as dashboard_router


app = FastAPI(
    title="Horizon API",
    version="1.0.0",
    description="Backend API for Horizon",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(auth_router)
app.include_router(project_router)
app.include_router(task_router)
app.include_router(dashboard_router)
app.include_router(notification_router)

@app.on_event("startup")
def startup():
    create_tables()


@app.get("/")
def root():
    return {
        "message": "Welcome to Horizon 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }