import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../components/services/apiService";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const getSong = createAsyncThunk("song/getSong", async () => {
  const response = await fetch(`${SERVER_URL}/api/songs`);
  const data = await response.json();
  return data;
});

export const uploadSong = createAsyncThunk(
  "song/uploadSong",
  async (
    { songTitle, artistName, albumName, releaseDate, link },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiService("api/songs", {
        method: "POST",
        body: JSON.stringify({
          songTitle,
          artistName,
          albumName,
          releaseDate,
          link,
        }),
      });
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Song Already Exists"
      );
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
  song: [],
  uploadSong: "",
};

export const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSong.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getSong.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.song = action.payload;
    });
    builder.addCase(getSong.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //Upload Song
    builder.addCase(uploadSong.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(uploadSong.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.uploadSong = action.payload;
    });
    builder.addCase(uploadSong.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default songSlice.reducer;
