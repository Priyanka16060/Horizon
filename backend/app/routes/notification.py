from fastapi import APIRouter, Depends
from app.dependencies.auth import get_current_user
from app.models.user import User

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)

@router.get("/")
def get_notifications(
    current_user: User = Depends(get_current_user),
):
    return [
        {
            "id": 1,
            "message": "Welcome back!",
            "time": "Just now",
        },
        {
            "id": 2,
            "message": "You successfully logged in.",
            "time": "Today",
        },
        {
            "id": 3,
            "message": "Start creating projects 🚀",
            "time": "Today",
        },
    ]