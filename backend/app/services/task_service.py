from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.task import Task
from app.models.user import User
from app.schemas.task import (
    TaskCreate,
    TaskUpdate,
)


def create_task(
    db: Session,
    task: TaskCreate,
    current_user: User,
):
    project = (
        db.query(Project)
        .filter(
            Project.id == task.project_id,
            Project.owner_id == current_user.id,
        )
        .first()
    )

    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found",
        )

    new_task = Task(
    title=task.title,
    description=task.description,
    status=task.status,
    priority=task.priority,
    project_id=task.project_id,
    owner_id=current_user.id,
)

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


def get_all_tasks(
    db: Session,
    current_user: User,
):
    return (
        db.query(Task)
        .join(Project)
        .filter(Project.owner_id == current_user.id)
        .all()
    )


def get_task_by_id(
    db: Session,
    task_id: int,
    current_user: User,
):
    task = (
        db.query(Task)
        .join(Project)
        .filter(
            Task.id == task_id,
            Project.owner_id == current_user.id,
        )
        .first()
    )

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task not found",
        )

    return task


def update_task(
    db: Session,
    task_id: int,
    task_data: TaskUpdate,
    current_user: User,
):
    task = get_task_by_id(
        db,
        task_id,
        current_user,
    )

    task.title = task_data.title
    task.description = task_data.description
    task.status = task_data.status
    task.priority = task_data.priority

    db.commit()
    db.refresh(task)

    return task


def delete_task(
    db: Session,
    task_id: int,
    current_user: User,
):
    task = get_task_by_id(
        db,
        task_id,
        current_user,
    )

    db.delete(task)
    db.commit()