import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../components/services/authService";

const initialState = {
  active: false,
  isLoggedIn: false,
  user: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const { user, token } = await authService.login(email, password);
    return { user: user, token: token };
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.isLoggedIn = true;
      state.user = action.payload.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.status = "idle";
    });
  },
});

export default user.reducer;
