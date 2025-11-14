import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import authService from "../components/services/authService";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  active: false,
  loggin: false,
  user: null,
  status: "idle",
  error: null,
  userLogin: {
    email: "",
    password: "",
  },
};

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

export const postUserLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const user = await authService.login(email, password);
    return user;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

// export const postUserLogin = createAsyncThunk(
//   "userLogin/postUserLogin",
//   async (value) => {
//     // console.log("Inside LOGIN POST API");
//     // console.log(value);
//     const res = await fetch(`${SERVER_URL}/api/auth/login`, {
//       method: "POST",
//       headers: {
//         Accept: "application.json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email: value.email, password: value.password }),
//     });
//     const data = await res.json();

//     if (data.accessToken) {
//       sessionStorage.setItem("accessToken", data.accessToken);
//     }
//     return { id: data.id, accessToken: data.accessToken };
// }
// );

export default userLoginSlice.reducer;
