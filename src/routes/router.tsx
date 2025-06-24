import { Navigate, RouteProps } from "react-router-dom";
import { SetAccessTokenFunction } from "../hooks/authentication/types";
import FriendsPage from "../pages/friends/FriendsPage";
import GenerateLessonPage from "../pages/generateLesson/GenerateLessonPage";
import LessonsPage from "../pages/lesson/LessonsPage/LessonsPage";
import LoginPage from "../pages/login/LoginPage";
import QuizPage from "../pages/quiz/Quiz";
import RegisterPage from "../pages/register/RegisterPage";
import LessonOverviewPage from "../pages/lesson/LessonOverview/LessonOverviewPage";
import { PAGES_ROUTES } from "./routes.const";
import SettingsPage from "../pages/settings/SettingsPage";
import UserProfilePage from "../pages/userProfile/UserProfilePage";

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
  { path: PAGES_ROUTES.SUMMARY, element: <LessonOverviewPage /> },
  { path: PAGES_ROUTES.LESSON, element: <LessonsPage /> },
  { path: PAGES_ROUTES.FRIENDS, element: <FriendsPage /> },
  { path: PAGES_ROUTES.PROFILE, element: <UserProfilePage /> },
  {
    path: PAGES_ROUTES.PROFILE_WITH_ID, element: <UserProfilePage />,
  },
];
