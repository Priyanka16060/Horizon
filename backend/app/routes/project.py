from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.dependencies.auth import get_current_user
from app.models.user import User

from app.db.dependencies import get_db
from app.schemas.project import (
    ProjectCreate,
    ProjectResponse,
    ProjectUpdate,
)

from app.services.project_service import (
    create_project,
    get_all_projects,
    get_project_by_id,
    delete_project,
    update_project,
)

router = APIRouter(
    prefix="/projects",
    tags=["Projects"],
)


@router.post("/", response_model=ProjectResponse)
def create_project_route(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_project(
        db,
        project,
        current_user,
    )

@router.get("/", response_model=list[ProjectResponse])
def get_projects(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_all_projects(
        db,
        current_user,
    )


@router.get("/{project_id}")
def get_project(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_project_by_id(
        db,
        project_id,
        current_user,
    )

@router.put("/{project_id}", response_model=ProjectResponse)
def update_project_route(
    project_id: int,
    project: ProjectUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return update_project(
        db,
        project_id,
        project,
        current_user,
    )

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project_route(
    project_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    delete_project(
    db,
    project_id,
    current_user,
)
