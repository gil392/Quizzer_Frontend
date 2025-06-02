import { configureStore } from "@reduxjs/toolkit";

import lessonReducer from "./lessonReducer";
import quizReducer from "./quizReducer";
import userReducer from "./userReducer";

export const store = configureStore({
  reducer: {
    lessons: lessonReducer,
    quizzes: quizReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
