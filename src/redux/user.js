import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../components/services/authService";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password);
      return response;
    } catch (err) {
      return rejectWithValue(err.message || "Login Failed");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
  return { ...initialState };
});

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.register(username, email, password);
      return response;
    } catch (err) {
      return rejectWithValue(err.message || "Registration failed");
    }
  }
);

const initialState = {
  active: false,
  isLoggedIn: false,
  user: null,
  status: "idle",
  error: null,
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.isLoggedIn = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        return { ...initialState };
      })
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.isLoggedIn = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearError } = user.actions;
export default user.reducer;
