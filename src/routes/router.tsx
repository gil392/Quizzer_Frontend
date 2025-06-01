import { Navigate, RouteProps } from "react-router-dom";
import { SetAccessTokenFunction } from "../hooks/authentication/types";
import FriendsPage from "../pages/friends/FriendsPage";
import GenerateLessonPage from "../pages/generateLesson/GenerateLessonPage";
import LessonsPage from "../pages/lesson/LessonsPage/LessonsPage";
import LoginPage from "../pages/login/LoginPage";
import ProfilePage from "../pages/profile/ProfilePage";
import QuizPage from "../pages/Quiz";
import RegisterPage from "../pages/register/RegisterPage";
import SettingsPage from "../pages/settings/SettingsPage";
import SummaryPage from "../pages/Summary";
import { PAGES_ROUTES } from "./routes.const";

export const createPagesRoutes = (
  setAccessToken: SetAccessTokenFunction
): RouteProps[] => [
  {
    path: PAGES_ROUTES.HOME,
    element: <Navigate to={PAGES_ROUTES.LESSONS_LIST} replace />,
  },
  {
    path: PAGES_ROUTES.LOGIN,
    element: <LoginPage setAccessToken={setAccessToken} />,
  },
  {
    path: PAGES_ROUTES.REGISTER,
    element: <RegisterPage setAccessToken={setAccessToken} />,
  },
  { path: PAGES_ROUTES.SETTINGS, element: <SettingsPage /> },
  { path: PAGES_ROUTES.GENERATE_LESSON, element: <GenerateLessonPage /> },
  { path: PAGES_ROUTES.QUIZ, element: <QuizPage /> },
  { path: PAGES_ROUTES.SUMMARY, element: <SummaryPage /> },
  { path: PAGES_ROUTES.LESSON, element: <LessonsPage /> },
  { path: PAGES_ROUTES.FRIENDS, element: <FriendsPage /> },
  { path: PAGES_ROUTES.PROFILE, element: <ProfilePage /> },
];
