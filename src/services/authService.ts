import api from "../axios/axios";
import type { User } from "../types/userType";

export const getUserByEmail = async (email: string) => {
  const response = await api.get(`/users?email=${email}`);
  return response.data;
};

export const registerUser = async (user: User) => {
  const response = await api.post("/users", user);
  return response.data;
};

export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export const getUserById = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};