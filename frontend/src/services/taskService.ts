import api from "../api/axios";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  project_id: number;
}

export interface TaskCreate {
  title: string;
  description: string;
  status: string;
  priority: string;
  project_id: number;
}

export interface TaskUpdate {
  title: string;
  description: string;
  status: string;
  priority: string;
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks");
  return response.data;
};

export const getTask = async (id: number): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (
  task: TaskCreate
): Promise<Task> => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const updateTask = async (
  id: number,
  task: TaskUpdate
): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (
  id: number
): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};
export const getTasksByProject = async (
  projectId: number
): Promise<Task[]> => {
  const response = await api.get(`/tasks/project/${projectId}`);
  return response.data;
};