import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthentication } from '../../hooks/authentication/authentication';
import HomePage from '../../pages/home/Home';
import LoginPage from '../../pages/login/LoginPage';
import QuizPage from '../../pages/Quiz';
import RegisterPage from '../../pages/register/RegisterPage';
import SummaryPage from '../../pages/Summary';
import { styles } from './styles';

interface LayoutProps extends WithStyles<typeof styles> {}

const Layout: FunctionComponent<LayoutProps> = (props) => {
    const { classes } = props;
    const setAccessToken = useAuthentication();

    return (
        <div className={classes.root}>
            <Routes>
                <Route path='/' element={<Navigate to='/home' replace />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/summary' element={<SummaryPage />} />
                <Route path='/quiz' element={<QuizPage />} />
                <Route
                    path='/signup'
                    element={<RegisterPage {...{ setAccessToken }} />}
                />
                <Route
                    path='/login'
                    element={<LoginPage {...{ setAccessToken }} />}
                />
            </Routes>
        </div>
    );
};

export default withStyles(styles)(Layout);
