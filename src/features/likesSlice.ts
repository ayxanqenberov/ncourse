import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../axios/axios";
import { Course } from "../features/courseSlice"; 

interface WishlistState {
  favoriteCourses: Course[]; 
  loading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  favoriteCourses: [],
  loading: false,
  error: null,
};
export const fetchUserFavorites = createAsyncThunk(
  "wishlist/fetchUserFavorites",
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/${userId}/favorites`);
      return response.data; 
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "İstək siyahısı yüklənmədi");
    }
  }
);

export const toggleWishlist = createAsyncThunk(
  "wishlist/toggleWishlist",
  async ({ courseId, userId }: { courseId: string; userId: string }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/courses/toggle-wishlist`, { courseId, userId });
      return { courseId, userId, action: response.data.action, updatedCourse: response.data.course };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Əməliyyat uğursuz oldu");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteCourses = action.payload;
      })
      .addCase(fetchUserFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.loading = false;
        const { courseId, action: apiAction, updatedCourse } = action.payload;

        if (apiAction === "removed") {
          state.favoriteCourses = state.favoriteCourses.filter(item => item.id !== courseId);
        } else if (apiAction === "added" && updatedCourse) {
          state.favoriteCourses.push(updatedCourse);
        }
      });
  },
});

export default wishlistSlice.reducer;