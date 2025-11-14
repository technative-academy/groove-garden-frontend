import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../components/services/authService";

// const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  status: "idle",
  error: null,
  registerData: {
    username: "",
    email: "",
    password: "",
  },
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
    console.log(username);
    console.log(email);
    console.log(password);
    const userRegister = await authService.register(username, email, password);
    return userRegister;
  }
);

// export const registerUser = createAsyncThunk(
//   "register/registerUser",
//   async (value) => {
//     fetch(`${SERVER_URL}/api/auth/register`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username: value.username,
//         email: value.email,
//         password: value.password,
//       }),
//     }).then((res) => res.json);
//   }
// );

export default registerSlice.reducer;
