import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./localStorage";

import allSongsReducer from "./allSongs";
import uiStateReducer from "./uiState";
import userReducer from "./user";
import playlistReducer from "./playlist";

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    allSongs: allSongsReducer,
    ui: uiStateReducer,
    user: userReducer,
    playlist: playlistReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    user: store.getState().user,
  });
});
