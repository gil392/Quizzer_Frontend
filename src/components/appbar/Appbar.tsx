import { NotificationsOutlined } from "@mui/icons-material";
import { Badge, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import { isNotNil, pipe } from "ramda";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { getMessages } from "../../api/user/api";
import { Message } from "../../api/user/types";
import { isNavBarAvailableInPath } from "../navBar/utils";
import DisplayModeSwitch from "../settings/DisplayModeSwitch/DisplayModeSwitch";
import { removeUserDisplayMode } from "../settings/DisplayModeSwitch/utils";
import ProfileImage from "./components/ProfileImage";
import { MAX_MESSAGES_BADGE_CONTENT, MESSAGES_INTERVAL_MS } from "./const";
import useStyles from "./styles";
import { PAGES_ROUTES } from "../../routes/routes.const";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { logoutAsync } from "../../store/userReducer";

const AppBar: FunctionComponent = () => {
  const classes = useStyles();
  const [, setMessages] = useState<Message[]>([]);
  const [unReededMessagesCount, setUnReededMessagesCount] = useState<number>();
  const [lastMessagesFetch, setLastMessagesFetch] = useState<Date>();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const isAppBarAvaiable = useMemo(
    () => isNavBarAvailableInPath(location.pathname),
    [location]
  );

  const fetchMessages = useCallback((abortController: AbortController) => {
    getMessages(lastMessagesFetch?.getTime(), abortController).then(
      ({ data }) => {
        setMessages(data);
        setUnReededMessagesCount(data.filter(({ reeded }) => !reeded).length);
        setLastMessagesFetch(new Date());
      }
    );
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    fetchMessages(abortController);
    const messagesInterval = setInterval(() => {
      fetchMessages(abortController);
    }, MESSAGES_INTERVAL_MS);

    return () => {
      clearInterval(messagesInterval);
      abortController.abort();
    };
  }, []);

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
        navigate(PAGES_ROUTES.PROFILE);
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
      <IconButton>
        <Badge
          badgeContent={unReededMessagesCount}
          max={MAX_MESSAGES_BADGE_CONTENT}
          classes={{ badge: classes.badge }}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <NotificationsOutlined className={classes.notifications} />
        </Badge>
      </IconButton>
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
