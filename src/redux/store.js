import { configureStore } from "@reduxjs/toolkit";

import allSongsReducer from "./allSongs";

export const store = configureStore({
  reducer: {
    allSongs: allSongsReducer,
  },
});
