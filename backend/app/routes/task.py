from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.dependencies.auth import get_current_user
from app.models.user import User

from app.schemas.task import (
    TaskCreate,
    TaskResponse,
    TaskUpdate,
)

from app.services.task_service import (
    create_task,
    get_all_tasks,
    get_task_by_id,
    update_task,
    delete_task,
)

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"],
)


@router.post(
    "/",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_task_route(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_task(
        db,
        task,
        current_user,
    )


@router.get(
    "/",
    response_model=list[TaskResponse],
)
def get_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_all_tasks(
        db,
        current_user,
    )


@router.get(
    "/{task_id}",
    response_model=TaskResponse,
)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_task_by_id(
        db,
        task_id,
        current_user,
    )


@router.put(
    "/{task_id}",
    response_model=TaskResponse,
)
def update_task_route(
    task_id: int,
    task: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return update_task(
        db,
        task_id,
        task,
        current_user,
    )


@router.delete(
    "/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_task_route(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    delete_task(
        db,
        task_id,
        current_user,
    )