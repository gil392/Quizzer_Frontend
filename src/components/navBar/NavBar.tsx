import { AutoStories, People, Settings, YouTube } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FunctionComponent, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PAGES_ROUTES } from "../../routes/routes.const";
import {
  Drawer,
  listItemButtonSx,
  listItemIconSx,
  listItemSx,
  listItemTextSx,
  listSx,
  logoIconSx,
  logoTextSx,
} from "./styles";
import { NavBarItem } from "./types";
import { isNavBarAvailableInPath } from "./utils";

const navBarNavigations: readonly NavBarItem[] = [
  {
    text: "Generate Lesson",
    icon: <YouTube />,
    route: "GENERATE_LESSON",
  },
  {
    text: "Lessons",
    icon: <AutoStories />,
    route: "LESSONS_LIST",
  },
  {
    text: "My Friends",
    icon: <People />,
    route: "FRIENDS",
  },
];

const NavBar: FunctionComponent = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isNavBarAvaiable = useMemo(
    () => isNavBarAvailableInPath(location.pathname),
    [location]
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const createNavigationHandle = (to: keyof typeof PAGES_ROUTES) => () =>
    navigate(PAGES_ROUTES[to]);

  const navBarItems = navBarNavigations.map(({ text, icon, route }) => (
    <ListItem disablePadding sx={listItemSx} key={route}>
      <ListItemButton
        sx={listItemButtonSx(open)}
        onClick={createNavigationHandle(route)}
      >
        <ListItemIcon sx={listItemIconSx(open)}>{icon}</ListItemIcon>
        <ListItemText primary={text} sx={listItemTextSx(open)} />
      </ListItemButton>
    </ListItem>
  ));

  return isNavBarAvaiable ? (
    <Drawer
      variant="permanent"
      open={open}
      onMouseEnter={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
    >
      <Box
        sx={{
          ...logoIconSx(open),
        }}
        onClick={createNavigationHandle("HOME")}
      >
        <img
          src="/images/qLogo.svg"
          alt="Quizzer Logo"
          style={{
            height: 50,
            width: 50,
            objectFit: "contain",
            display: "block",
          }}
        />{" "}
        {open ? <Typography sx={logoTextSx(open)}>Quizzer</Typography> : null}
      </Box>
      <Divider />
      <List sx={listSx}>{navBarItems}</List>
      <Divider />
      <Box>
        <ListItemButton
          sx={listItemButtonSx(open)}
          onClick={createNavigationHandle("SETTINGS")}
        >
          <ListItemIcon sx={listItemIconSx(open)}>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Setting" sx={listItemTextSx(open)} />
        </ListItemButton>
      </Box>
    </Drawer>
  ) : null;
};

export default NavBar;
