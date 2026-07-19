import api from "../axios/axios";
import { Course } from "../types/courseType";

export const createCourse = async (course: Omit<Course, "id">) => {
  const res = await api.post("/courses", course);
  return res.data;
};

export const getCourses = async () => {
  const res = await api.get("/courses");
  return res.data;
};

export const getCourseById = async (id: string) => {
  const res = await api.get(`/courses/${id}`);
  return res.data;
};

export const updateCourse = async (
  id: string,
  updatedCourse: Partial<Course>
) => {
  const res = await api.put(`/courses/${id}`, updatedCourse);
  return res.data;
};

export const deleteCourse = async (id: string) => {
  await api.delete(`/courses/${id}`);
};