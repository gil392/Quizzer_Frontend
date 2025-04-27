import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuthentication } from '../../hooks/authentication/authentication';
import { createPagesRoutes } from '../../routes/router';
import { styles } from './styles';

interface LayoutProps extends WithStyles<typeof styles> {}

const Layout: FunctionComponent<LayoutProps> = (props) => {
    const { classes } = props;
    const setAccessToken = useAuthentication();

    const routes = createPagesRoutes(setAccessToken).map(
        (routeProps, index) => <Route {...routeProps} key={index} />
    );
    return (
        <div className={classes.root}>
            <Routes>{routes}</Routes>
        </div>
    );
};

export default withStyles(styles)(Layout);
