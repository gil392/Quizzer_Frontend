import { Toolbar, Menu, MenuItem } from "@mui/material";
import { isNotNil, pipe } from "ramda";
import { FunctionComponent, useMemo, useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { isNavBarAvailableInPath } from "../navBar/utils";
import DisplayModeSwitch from "../settings/DisplayModeSwitch/DisplayModeSwitch";
import { removeUserDisplayMode } from "../settings/DisplayModeSwitch/utils";
import ProfileImage from "./components/ProfileImage";
import useStyles from "./styles";
import NotificationBell from "./components/NotificationBell";
import { PAGES_ROUTES } from "../../routes/routes.const";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { logoutAsync } from "../../store/userReducer";

const AppBar: FunctionComponent = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { loggedUser } = useSelector((state: RootState) => state.user);

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

  const createAppbarMenu = (
    navigate: NavigateFunction,
    handleLogout: () => void
  ): { label: string; onClick: () => void }[] => [
    {
      label: "Profile",
      onClick: () => {
        navigate(PAGES_ROUTES.PROFILE, {
          state: { userId: loggedUser?._id },
        });
      },
    },
    {
      label: "Sign Out",
      onClick: async () => {
        handleLogout();
        await dispatch(logoutAsync());
        navigate(PAGES_ROUTES.LOGIN);
      },
    },
  ];

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
      <NotificationBell
        onClick={() => navigate(PAGES_ROUTES.NOTIFICATIONS_LIST)}
      />
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
