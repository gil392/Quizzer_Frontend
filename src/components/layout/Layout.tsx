import { Box } from '@mui/material';
import { withStyles, WithStyles } from '@mui/styles';
import { FunctionComponent } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAuthentication } from '../../hooks/authentication/authentication';
import { createPagesRoutes } from '../../routes/router';
import { rootSx, styles } from './styles';

interface LayoutProps extends WithStyles<typeof styles> {}

const Layout: FunctionComponent<LayoutProps> = (props) => {
    const { classes } = props;
    const setAccessToken = useAuthentication();

    const routes = createPagesRoutes(setAccessToken).map(
        (routeProps, index) => <Route {...routeProps} key={index} />
    );
    return (
        <Box className={classes.root} sx={rootSx}>
            <Routes>{routes}</Routes>
        </Box>
    );
};

export default withStyles(styles)(Layout);
