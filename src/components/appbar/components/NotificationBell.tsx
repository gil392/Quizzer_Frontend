import { useEffect, useRef } from "react";
import { Badge, IconButton } from "@mui/material";
import { NotificationsOutlined } from "@mui/icons-material";
import {
  MAX_MESSAGES_BADGE_CONTENT,
  NOTIFICATIONS_INTERVAL_MS,
} from "../const";
import useStyles from "../styles";
import { fetchNotifications } from "../../../store/notificationReducer";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";

interface NotificationBellProps {
  onClick?: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ onClick }) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  useEffect(() => {
    dispatch(fetchNotifications());

    intervalRef.current = setInterval(
      () => dispatch(fetchNotifications()),
      NOTIFICATIONS_INTERVAL_MS
    );

    const handleUpdate = () => dispatch(fetchNotifications());
    window.addEventListener("notifications-updated", handleUpdate);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("notifications-updated", handleUpdate);
    };
  }, [dispatch]);

  return (
    <IconButton onClick={onClick} aria-label="notifications">
      <Badge
        badgeContent={unreadCount > 0 ? unreadCount : null}
        max={MAX_MESSAGES_BADGE_CONTENT}
        color="primary"
        classes={{ badge: classes.badge }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <NotificationsOutlined className={classes.notificaion} />
      </Badge>
    </IconButton>
  );
};

export default NotificationBell;
