import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "UiState",
  initialState: {
    loginActive: false,
    editActive: false,
    createActive: false,
  },
  reducers: {
    loginToggleActive: (state) => {
      state.loginActive = !state.loginActive;
    },
    editToggleActive: (state) => {
      state.editActive = !state.editActive;
    },
    createToggleActive: (state) => {
      state.createActive = !state.createActive;
    },
  },
});

export const { loginToggleActive, editToggleActive, createToggleActive } =
  uiSlice.actions;
export default uiSlice.reducer;
