import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import type { Course, CourseState } from "../types/courseType";
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
} from "../services/courseService";
import { RootState } from "../app/store";

const API_URL = import.meta.env.VITE_API_URL;
interface User {
  id: string;
  favoriteCourses?: string[];
  [key: string]: any;
}

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
    { id, updatedCourse }: { id: string; updatedCourse: Partial<Course> },
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

export const toggleWishlist = createAsyncThunk(
  "courses/toggleWishlist",
  async (
    { courseId, userId }: { courseId: string; userId: string },
    thunkAPI
  ) => {
    try {
      const [courseRes, userRes] = await Promise.all([
        fetch(`${API_URL}/courses/${courseId}`),
        fetch(`${API_URL}/users/${userId}`),
      ]);

      if (!courseRes.ok || !userRes.ok) {
        throw new Error("Məlumatları gətirmək mümkün olmadı");
      }

      const course: Course = await courseRes.json();
      const user: User = await userRes.json();

      const currentLikes = Array.isArray(course.likes) ? course.likes : [];
      const currentFavorites = Array.isArray(user.favoriteCourses)
        ? user.favoriteCourses
        : [];

      const isLiked = currentLikes.includes(userId);

      const updatedLikes = isLiked
        ? currentLikes.filter((id) => id !== userId)
        : [...currentLikes, userId];

      const updatedFavorites = isLiked
        ? currentFavorites.filter((id) => id !== courseId)
        : [...currentFavorites, courseId];
      await Promise.all([
        fetch(`${API_URL}/courses/${courseId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ likes: updatedLikes }),
        }),
        fetch(`${API_URL}/users/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ favoriteCourses: updatedFavorites }),
        }),
      ]);

      return { courseId, updatedLikes, userId, updatedFavorites };
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
      )
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        const { courseId, updatedLikes } = action.payload;
        const targetCourse = state.courses.find(
          (course) => course.id === courseId
        );
        if (targetCourse) {
          targetCourse.likes = updatedLikes;
        }
      });
  },
});

export const selectAllCourses = (state: RootState) => state.courses.courses;
export const selectCoursesLoading = (state: RootState) => state.courses.loading;

export const selectPopularCourses = createSelector(
  [selectAllCourses],
  (courses) => {
    if (!courses) return [];
    return [...courses].sort((a, b) => (b.views || 0) - (a.views || 0));
  }
);

export const selectBestCourses = createSelector(
  [selectAllCourses],
  (courses) => {
    if (!courses) return [];
    return [...courses].sort((a, b) => {
      const likesA = Array.isArray(a.likes) ? a.likes.length : 0;
      const likesB = Array.isArray(b.likes) ? b.likes.length : 0;
      return likesB - likesA;
    });
  }
);

export default courseSlice.reducer;