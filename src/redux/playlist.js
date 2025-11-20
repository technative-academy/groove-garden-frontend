import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../components/services/apiService";
import playlistService from "../components/services/playlistService";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const getMyPlaylist = createAsyncThunk(
  "playlist/getMyPlaylist",
  async () => {
    const response = await apiService("api/playlists/my_playlists");
    return response;
  }
);

export const editMyPlaylist = createAsyncThunk(
  "playlist/editPlaylist",
  async ({ id, title, description }) => {
    console.log(id, title, description);
    const payload = {};
    if (title && title.trim() !== "") payload.title = title.trim();
    if (description && description.trim() !== "")
      payload.description = description;

    const response = await apiService(`api/playlists/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    console.log(response);
    //created_by_user_id
    //title
    //description
  }
);

// export const editMyPlaylist = createAsyncThunk(
//   "playlist/editPlaylist",
//   async (id, title, description) => {
//     const response = await playlistService.editMyPlaylist(
//       id,
//       title,
//       description
//     );
//     console.log(response);
//     //created_by_user_id
//     //title
//     //description
//   }
// );

const initialState = {
  status: "idle",
  error: null,
  myPlaylist: [],
};

export const myCollectionsSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyPlaylist.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getMyPlaylist.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.myPlaylist = action.payload;
    });
    builder.addCase(getMyPlaylist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default myCollectionsSlice.reducer;
