import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Course, CourseState } from "../types/courseType";
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} from "../services/courseService";

const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, thunkAPI) => {
    try {
      return await getCourses();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (course: Omit<Course, "id">, thunkAPI) => {
    try {
      return await createCourse(course);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const editCourse = createAsyncThunk(
  "courses/editCourse",
  async (
    {
      id,
      updatedCourse,
    }: {
      id: string;
      updatedCourse: Partial<Course>;
    },
    thunkAPI
  ) => {
    try {
      return await updateCourse(id, updatedCourse);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const removeCourse = createAsyncThunk(
  "courses/removeCourse",
  async (id: string, thunkAPI) => {
    try {
      await deleteCourse(id);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchCourses.fulfilled,
        (state, action: PayloadAction<Course[]>) => {
          state.loading = false;
          state.courses = action.payload;
          state.error = null;
        }
      )

      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        addCourse.fulfilled,
        (state, action: PayloadAction<Course>) => {
          state.courses.unshift(action.payload);
        }
      )
      .addCase(
        editCourse.fulfilled,
        (state, action: PayloadAction<Course>) => {
          const index = state.courses.findIndex(
            (course) => course.id === action.payload.id
          );

          if (index !== -1) {
            state.courses[index] = action.payload;
          }
        }
      )
      .addCase(
        removeCourse.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.courses = state.courses.filter(
            (course) => course.id !== action.payload
          );
        }
      );
  },
});

export default courseSlice.reducer;