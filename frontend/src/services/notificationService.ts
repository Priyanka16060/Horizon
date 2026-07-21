import api from "../api/axios";

export async function getNotifications() {
  const response = await api.get("/notifications");
  return response.data;
}