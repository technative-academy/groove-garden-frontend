import { configureStore } from "@reduxjs/toolkit";

import allSongsReducer from "./allSongs";
// import quizDataReducer from "./quizListSlice";
// import quizQuestionsByIdReducer from "./quizQuestionsByIdSlice";

export const store = configureStore({
  reducer: {
    allSongs: allSongsReducer,
    // quizData: quizDataReducer,
    // quizQuestions: quizQuestionsByIdReducer,
  },
});
