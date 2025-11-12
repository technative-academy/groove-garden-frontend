import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const initialState = {
  status: "idle",
  error: null,
  allSongsData: [],
};

export const allSongsSlice = createSlice({
  name: "allSongs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllSongs.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllSongs.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.allSongsData = action.payload;
    });
    builder.addCase(getAllSongs.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const getAllSongs = createAsyncThunk(
  "allSongs/getAllSongs",
  async () => {
    const response = await fetch(`${SERVER_URL}/api/songs`);
    const data = await response.json();
    return data;
  }
);

export default allSongsSlice.reducer;
