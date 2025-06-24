import { configureStore, combineReducers, AnyAction } from "@reduxjs/toolkit";
import lessonReducer from "./lessonReducer";
import quizReducer from "./quizReducer";
import userReducer, { logoutAsync } from "./userReducer";
import attemptReducer from "./attemptReducer";
import notificaionReducer from "./notificationReducer";

const appReducer = combineReducers({
  lessons: lessonReducer,
  quizzes: quizReducer,
  user: userReducer,
  attempt: attemptReducer,
  notifications: notificaionReducer,

});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction
) => {
  if (logoutAsync.fulfilled.match(action)) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
