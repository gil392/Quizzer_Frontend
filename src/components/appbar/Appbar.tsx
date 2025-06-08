import { Toolbar, Menu, MenuItem } from "@mui/material";
import { isNotNil, pipe } from "ramda";
import { FunctionComponent, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isNavBarAvailableInPath } from "../navBar/utils";
import DisplayModeSwitch from "../settings/DisplayModeSwitch/DisplayModeSwitch";
import { removeUserDisplayMode } from "../settings/DisplayModeSwitch/utils";
import ProfileImage from "./components/ProfileImage";
import { createAppbarMenu } from "./utils";
import useStyles from "./styles";
import NotificationBell from "./components/NotificationBell";
import { PAGES_ROUTES } from "../../routes/routes.const";

const AppBar: FunctionComponent = () => {
  const classes = useStyles({});
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isAppBarAvaiable = useMemo(
    () => isNavBarAvailableInPath(location.pathname),
    [location]
  );

  const handleLogout = () => {
    removeUserDisplayMode();
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = createAppbarMenu(navigate, handleLogout).map(
    ({ label, onClick }, index) => (
      <MenuItem key={index} onClick={pipe(onClick, handleClose)}>
        {label}
      </MenuItem>
    )
  );

  return isAppBarAvaiable ? (
    <Toolbar className={classes.toolbar}>
      <DisplayModeSwitch />
      <NotificationBell onClick={() => navigate(PAGES_ROUTES.NOTIFICATIONS)} />
      <ProfileImage handleMenu={handleMenu} />

      <Menu
        anchorEl={anchorEl}
        className={classes.menu}
        open={isNotNil(anchorEl)}
        onClose={handleClose}
      >
        {menuItems}
      </Menu>
    </Toolbar>
  ) : null;
};

export default AppBar;
