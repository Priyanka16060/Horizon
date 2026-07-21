from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.task import Task
from app.models.user import User


def get_dashboard_data(
    db: Session,
    current_user: User,
):
    projects = (
        db.query(Project)
        .filter(Project.owner_id == current_user.id)
        .all()
    )

    tasks = (
        db.query(Task)
        .filter(Task.owner_id == current_user.id)
        .all()
    )

    total_projects = len(projects)
    total_tasks = len(tasks)

    completed_tasks = len(
        [task for task in tasks if task.status == "Completed"]
    )

    in_progress_tasks = len(
        [task for task in tasks if task.status == "In Progress"]
    )

    todo_tasks = len(
        [task for task in tasks if task.status == "Todo"]
    )

    completion_rate = (
        round((completed_tasks / total_tasks) * 100, 1)
        if total_tasks > 0
        else 0
    )

    recent_projects = sorted(
        projects,
        key=lambda project: project.id,
        reverse=True,
    )[:5]

    recent_projects_data = []

    for project in recent_projects:

        project_tasks = [
            task
            for task in tasks
            if task.project_id == project.id
        ]

        if len(project_tasks) == 0:
            progress = 0
        else:
            completed = len(
                [
                    task
                    for task in project_tasks
                    if task.status == "Completed"
                ]
            )

            progress = int(
                (completed / len(project_tasks)) * 100
            )

        recent_projects_data.append(
            {
                "id": project.id,
                "name": project.name,
                "description": project.description,
                "progress": progress,
            }
        )

    return {
        "total_projects": total_projects,
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "in_progress_tasks": in_progress_tasks,
        "todo_tasks": todo_tasks,
        "completion_rate": completion_rate,
        "recent_projects": recent_projects_data,
    }