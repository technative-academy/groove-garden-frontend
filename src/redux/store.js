import { configureStore } from "@reduxjs/toolkit";

import allSongsReducer from "./allSongs";
import loginReducer from "./loginState";
import registerReducer from "./userRegister";
import userLoginReducer from "./userLogin";

export const store = configureStore({
  reducer: {
    allSongs: allSongsReducer,
    login: loginReducer,
    register: registerReducer,
    userLogin: userLoginReducer,
  },
});
