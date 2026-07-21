import api from "../api/axios";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export const login = async (data: LoginRequest) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const register = async (data: RegisterRequest) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};
export async function getCurrentUser() {
  const response = await api.get("/auth/me");
  return response.data;
}