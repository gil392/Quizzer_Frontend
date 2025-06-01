import { configureStore } from "@reduxjs/toolkit";

// Example: import your reducers here
// import someReducer from './features/someSlice';
import lessonReducer from "./lessonReducer";

export const store = configureStore({
  reducer: {
    lessons: lessonReducer,
  },
});

// Types for use in your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
