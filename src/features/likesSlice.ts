import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CourseItem } from "../Components/CourseCard/CourseCard";

const API_URL = import.meta.env.VITE_API_URL;

interface WishlistState {
  favoriteCourses: CourseItem[];
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
      const userRes = await axios.get(`${API_URL}/users/${userId}`);
      const favoriteIds: string[] = userRes.data.favoriteCourses || [];

      const coursesRes = await axios.get(`${API_URL}/courses`);
      const allCourses: CourseItem[] = coursesRes.data;
      return allCourses.filter((course) => favoriteIds.includes(course.id));
    } catch (err: any) {
      return rejectWithValue(err.message || "İstək siyahısı yüklənmədi");
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
      });
  },
});

export default wishlistSlice.reducer;