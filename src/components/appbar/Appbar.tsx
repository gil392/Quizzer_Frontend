import { NotificationsOutlined } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { isNotNil, pipe } from "ramda";
import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getLoggedUser, getMessages, updateUser } from "../../api/user/api";
import { Message, User } from "../../api/user/types";
import { isNavBarAvailableInPath } from "../navBar/utils";
import { MAX_MESSAGES_BADGE_CONTENT, MESSAGES_INTERVAL_MS } from "./const";
import useStyles from "./styles";
import { createAppbarMenu } from "./utils";
import { useDisplayMode } from "../settings/DisplayModeSwitch/globalProvider";
import { QuizSettings } from "../../api/quiz/types";
import { INITIAL_QUIZ_SETTINGS } from "../../api/quiz/constants";
import DisplayModeSwitch from "../settings/DisplayModeSwitch/DisplayModeSwitch";

const AppBar: FunctionComponent = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState<Message[]>([]);
  const [unReededMessagesCount, setUnReededMessagesCount] = useState<number>();
  const [lastMessagesFetch, setLastMessagesFetch] = useState<Date>();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const { displayMode, saveDisplayMode: setDisplayMode } = useDisplayMode();

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getLoggedUser();
        setUser(data);
        data?.settings && setDisplayMode(data.settings.displayMode);
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const updateSettings = async () => {
      if (user) {
        try {
          const previousSettings = user.settings ?? INITIAL_QUIZ_SETTINGS;
          const settings: QuizSettings = {
            ...previousSettings,
            displayMode,
          };
          await updateUser(user, { settings });
        } catch (error) {
          console.error("Error updating user: ", error);
        }
      } else {
        console.error("Error updating user: User does not exists");
      }
    };

    updateSettings();
  }, [displayMode]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = createAppbarMenu(navigate).map(
    ({ label, onClick }, index) => (
      <MenuItem key={index} onClick={pipe(onClick, handleClose)}>
        {label}
      </MenuItem>
    )
  );

  return isAppBarAvaiable ? (
    <Toolbar className={classes.toolbar}>
      <DisplayModeSwitch
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
      />
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
      <Avatar className={classes.avatar} onClick={handleMenu} />

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
