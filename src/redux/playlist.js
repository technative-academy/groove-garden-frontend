import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiService from "../components/services/apiService";

//Gets all the playlists
export const getMyPlaylist = createAsyncThunk(
  "playlist/getMyPlaylist",
  async () => {
    const response = await apiService("api/playlists/my_playlists");
    return response;
  },
);

//Get my playlist by ID
export const getMyPlaylistById = createAsyncThunk(
  "playlist/playlistId",
  async (id) => {
    const response = await apiService(`api/playlists/${id}`);
    return response;
  },
);

//Create new playlists
export const createNewPlaylist = createAsyncThunk(
  "playlist/createNewPlaylist",
  async (inputValue) => {
    const { title, description } = inputValue;
    const response = await apiService(`api/playlists`, {
      method: "POST",
      body: JSON.stringify({ title, description }),
    });
    return response;
  },
);

//Edit an already created Playlist
export const editMyPlaylist = createAsyncThunk(
  "playlist/editPlaylist",
  async ({ id, title, description }) => {
    const payload = {};
    if (title && title.trim() !== "") payload.title = title.trim();
    if (description && description.trim() !== "")
      payload.description = description;

    const response = await apiService(`api/playlists/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return response;
  },
);

//Add song to a playlist
export const addSongToMyPlaylist = createAsyncThunk(
  "playlist/addSongToPlaylist",
  async ({ playlist_id, songId }) => {
    const response = await apiService(
      `api/playlists/${playlist_id}/${songId}`,
      { method: "POST", body: JSON.stringify({ playlist_id, songId }) },
    );
    return response;
  },
);

//Delete a playlist
export const deleteMyPlaylist = createAsyncThunk(
  "playlist/deletePlaylist",
  async (id) => {
    const response = await apiService(`api/playlists/${id}`, {
      method: "DELETE",
    });
    return response;
  },
);

//Get all songs in the selected playlist
export const getAllSongsInPlaylist = createAsyncThunk(
  "playlist/getAllSongsInPlaylist",
  async (id) => {
    const response = await apiService(`api/playlists/playlist_songs/${id}`);
    return response;
  },
);

//DELETE song from playlist
export const deleteSongInPlaylist = createAsyncThunk(
  "playlist/deleteSongInPlaylist",
  async ({ playlistId, songId }) => {
    const response = await apiService(`api/playlists/${playlistId}/${songId}`, {
      method: "DELETE",
      body: JSON.stringify({ playlistId, songId }),
    });
    return response;
  },
);

const initialState = {
  status: "idle",
  error: null,
  myPlaylist: [],
  myPlaylistById: "",
  songsInPlaylist: [],
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Get My Playlist
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

    //Get Playlist By ID
    builder.addCase(getMyPlaylistById.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getMyPlaylistById.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.myPlaylistById = action.payload;
    });
    builder.addCase(getMyPlaylistById.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //Create New Playlist
    builder.addCase(createNewPlaylist.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(createNewPlaylist.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.myPlaylistById = action.payload;
    });
    builder.addCase(createNewPlaylist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //Get All Songs In Playlist
    builder.addCase(getAllSongsInPlaylist.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(getAllSongsInPlaylist.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.songsInPlaylist = action.payload;
    });
    builder.addCase(getAllSongsInPlaylist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    //Delete selected song in Playlist
    builder.addCase(deleteSongInPlaylist.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });
    builder.addCase(deleteSongInPlaylist.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      // state.songsInPlaylist = action.payload;
    });
    builder.addCase(deleteSongInPlaylist.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default playlistSlice.reducer;
