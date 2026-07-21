import api from "../api/axios";

export interface DashboardData {
  total_projects: number;
  total_tasks: number;
  completed_tasks: number;
  in_progress_tasks: number;
  todo_tasks: number;
  completion_rate: number;
  recent_projects: {
    id: number;
    name: string;
    description: string;
  }[];
}

export async function getDashboard() {
  const response = await api.get("/dashboard/");
  return response.data;
}