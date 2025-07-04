import { withStyles, WithStyles } from "@mui/styles";
import { FunctionComponent } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAuthentication } from "../../hooks/authentication/authentication";
import { createPagesRoutes } from "../../routes/router";
import { styles } from "./styles";
import { PAGES_ROUTES } from "../../routes/routes.const";
import clsx from "clsx";

interface LayoutProps extends WithStyles<typeof styles> {}

const Layout: FunctionComponent<LayoutProps> = (props) => {
  const { classes } = props;
  const setAccessToken = useAuthentication();
  const location = useLocation();

  const isAuthPage =
    location.pathname === PAGES_ROUTES.LOGIN ||
    location.pathname === PAGES_ROUTES.REGISTER;

  const routes = createPagesRoutes(setAccessToken).map((routeProps, index) => (
    <Route {...routeProps} key={index} />
  ));
  return (
    <div className={clsx(classes.root, { [classes.noPadding]: isAuthPage })}>
      <Routes>{routes}</Routes>
    </div>
  );
};

export default withStyles(styles)(Layout);
