console.log("PROJECT SERVICE LOADED");
import api from "../api/axios";

export interface Project {
  id: number;
  name: string;
  description: string;
}

export async function getProjects() {
  const response = await api.get("/projects/");
  return response.data;
}

export async function createProject(data: {
  name: string;
  description: string;
}) {
  const response = await api.post("/projects/", data);
  return response.data;
}

export async function deleteProject(id: number) {
  await api.delete(`/projects/${id}`);
}

export async function updateProject(
  id: number,
  data: {
    name: string;
    description: string;
  }
) {
  const response = await api.put(
    `/projects/${id}`,
    data
  );

  return response.data;
}
export async function getProject(id: number) {
  const response = await api.get(`/projects/${id}`);
  return response.data;
}
