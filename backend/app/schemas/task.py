from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict


class TaskCreate(BaseModel):
    title: str
    description: str
    status: str
    priority: str
    project_id: int


class TaskUpdate(BaseModel):
    title: str
    description: str
    status: str
    priority: str


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    status: str
    priority: str
    project_id: int

    model_config = ConfigDict(
        from_attributes=True,
    )