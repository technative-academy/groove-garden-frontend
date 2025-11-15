import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../components/services/authService";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  status: "idle",
  error: null,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.registerData = action.payload;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async ({ username, email, password }) => {
    const userRegister = await authService.register(username, email, password);
    return userRegister;
  }
);

export default registerSlice.reducer;
