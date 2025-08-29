import { useEffect, useRef } from "react";
import { Badge, IconButton } from "@mui/material";
import { NotificationsOutlined } from "@mui/icons-material";
import {
  MAX_MESSAGES_BADGE_CONTENT,
  NOTIFICATIONS_INTERVAL_MS,
} from "../const";
import useStyles from "../styles";
import {
  fetchNotifications,
  markNotificationAsReadAsync,
} from "../../../store/notificationReducer";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Notification as AppNotifications } from "../../../api/notification/types";

interface NotificationBellProps {
  onClick?: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ onClick }) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const handleRead = async (id: string) => {
    await dispatch(markNotificationAsReadAsync(id));
    window.dispatchEvent(new Event("notifications-updated"));
  };

  function notifyUser(notification: AppNotifications) {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      console.log("Notification permission granted.");
      const browserNotification = new Notification(notification.message, {
        tag: `quizzer-notification-${notification._id}`,
      });
      browserNotification.onclick = () => {
        console.log("Notification was read");
        handleRead(notification._id);
      };
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(notification.message, {
            tag: `quizzer-notification-${notification._id}`,
          });
        }
      });
    }
  }

  const { notifications } = useSelector(
    (state: RootState) => state.notifications
  );
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const unreadMessages = notifications.filter(
    (notification) => !notification.read
  );

  useEffect(() => {
    unreadMessages.forEach((notification) => {
      notifyUser(notification);
    });
  }, [unreadMessages]);

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
