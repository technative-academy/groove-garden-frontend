import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "UiState",
  initialState: {
    loginActive: false,
    editActive: false,
  },
  reducers: {
    loginToggleActive: (state) => {
      state.loginActive = !state.loginActive;
    },
    editToggleActive: (state) => {
      state.editActive = !state.editActive;
    },
  },
});

export const { loginToggleActive, editToggleActive } = uiSlice.actions;
export default uiSlice.reducer;
