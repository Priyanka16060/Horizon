from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectUpdate


def create_project(
    db: Session,
    project: ProjectCreate,
    current_user: User,
    ):
    new_project = Project(
    name=project.name,
    description=project.description,
    owner_id=current_user.id,)

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project


def get_all_projects(
    db: Session,
    current_user: User,
):
    return (
        db.query(Project)
        .filter(Project.owner_id == current_user.id)
        .all()
    )


def get_project_by_id(
    db: Session,
    project_id: int,
    current_user: User,
):
    project = (
        db.query(Project)
        .filter(
            Project.id == project_id,
            Project.owner_id == current_user.id,
        )
        .first()
    )
    if project is None:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    return project


def delete_project(
    db: Session,
    project_id: int,
    current_user: User,
):    
    project = get_project_by_id( 
        db,
        project_id,
        current_user,
    )
    db.delete(project)
    db.commit()


def update_project(
    db: Session,
    project_id: int,
    project_data: ProjectUpdate,
    current_user: User,
):
    project = get_project_by_id(
        db,
        project_id,
        current_user,
    )
    project.name = project_data.name
    project.description = project_data.description

    db.commit()
    db.refresh(project)

    return project