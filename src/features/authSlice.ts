import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  avatar?: string;
  favoriteCourses?: string[];
  basket?: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
const savedUser = localStorage.getItem("user");
const initialState: AuthState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("userId", action.payload.id);
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    },
    updateUserFavorites: (state, action: PayloadAction<string[]>) => {
      if (state.user) {
        state.user.favoriteCourses = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const { setUser, logout, updateUserFavorites } = authSlice.actions;
export default authSlice.reducer;