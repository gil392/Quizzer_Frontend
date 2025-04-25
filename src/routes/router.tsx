import { Navigate, NavigateProps, RouteProps } from 'react-router-dom';
import { SetAccessTokenFunction } from '../hooks/authentication/types';
import HomePage from '../pages/home/Home';
import LoginPage from '../pages/login/LoginPage';
import QuizPage from '../pages/Quiz';
import RegisterPage from '../pages/register/RegisterPage';
import SummaryPage from '../pages/Summary';
import { PAGES_ROUTES } from './routes.const';

const navigateToHomeProps: NavigateProps = {
    to: PAGES_ROUTES.HOME,
    replace: true
};

export const createPagesRoutes = (
    setAccessToken: SetAccessTokenFunction
): RouteProps[] => [
    {
        path: '/',
        element: <Navigate {...navigateToHomeProps} />
    },
    {
        path: PAGES_ROUTES.LOGIN,
        element: <LoginPage {...{ setAccessToken }} />
    },
    {
        path: PAGES_ROUTES.REGISTER,
        element: <RegisterPage {...{ setAccessToken }} />
    },
    { path: PAGES_ROUTES.HOME, element: <HomePage /> },
    { path: PAGES_ROUTES.QUIZ, element: <QuizPage /> },
    { path: PAGES_ROUTES.SUMMARY, element: <SummaryPage /> }
];
