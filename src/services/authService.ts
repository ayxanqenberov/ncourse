import api from "../axios/axios";


export const getUserByEmail = async (email: string) => {
  const response = await api.get(`/users?email=${email}`);
  return response.data;
};



export const registerUser = async (user: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/users", user);
  return response.data;
};



export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};