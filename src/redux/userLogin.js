import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../components/services/authService";

const initialState = {
  active: false,
  isLoggedIn: false,
  user: null,
  status: "idle",
  error: null,
  userLogin: {
    email: "",
    password: "",
  },
};

export const postUserLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const { user, token } = await authService.login(email, password);
    return { user: user, token: token };
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postUserLogin.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(postUserLogin.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.isLoggedIn = true;
      state.user = action.payload.user;
    });
    builder.addCase(postUserLogin.rejected, (state, action) => {
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

export default userLoginSlice.reducer;
