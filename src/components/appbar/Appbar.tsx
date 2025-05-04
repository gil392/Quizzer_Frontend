import { NotificationsOutlined } from "@mui/icons-material";
import { Avatar, Badge, IconButton, Toolbar } from "@mui/material";
import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { getMessages } from "../../api/user/api";
import { Message } from "../../api/user/types";
import { MAX_MESSAGES_BADGE_CONTENT, MESSAGES_INTERVAL_MS } from "./const";
import useStyles from "./styles";

const AppBar: FunctionComponent = () => {
  const classes = useStyles();
  const [messages, setMessages] = useState<Message[]>([]);
  const [unReededMessagesCount, setUnReededMessagesCount] = useState<number>();
  const [lastMessagesFetch, setLastMessagesFetch] = useState<Date>();

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

  return (
    <Toolbar className={classes.toolbar}>
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
      <Avatar className={classes.avatar} />
    </Toolbar>
  );
};

export default AppBar;
