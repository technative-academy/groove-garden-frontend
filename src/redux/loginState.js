import { createSlice } from "@reduxjs/toolkit";

const loginStateSlice = createSlice({
  name: "login",
  initialState: {
    active: false,
  },
  reducers: {
    toggleActive: (state) => {
      state.active = !state.active;
    },
  },
});

export const { toggleActive } = loginStateSlice.actions;
export default loginStateSlice.reducer;
