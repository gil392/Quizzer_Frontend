import { useEffect, useRef } from "react";
import { Badge, IconButton } from "@mui/material";
import { NotificationsOutlined } from "@mui/icons-material";
import {
  MAX_MESSAGES_BADGE_CONTENT,
  NOTIFICATIONS_INTERVAL_MS,
} from "../const";
import useStyles from "../styles";
import {
  deleteNotificationAsync,
  fetchNotifications,
  markNotificationAsReadAsync,
} from "../../../store/notificationReducer";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Notification as AppNotifications } from "../../../api/notification/types";
import { useNavigate } from "react-router-dom";
import { PAGES_ROUTES } from "../../../routes/routes.const";

interface NotificationBellProps {
  onClick?: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ onClick }) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const activeNotifications = useRef<Map<string, Notification>>(new Map());
  const navigate = useNavigate();

  const handleRead = async (id: string) => {
    await dispatch(markNotificationAsReadAsync(id));
    window.dispatchEvent(new Event("notifications-updated"));
  };

  const getNotificationRoute = (notification: AppNotifications): string => {
    switch (notification.type) {
      case "friendRequest":
        return PAGES_ROUTES.FRIENDS;
      case "achievement":
        return PAGES_ROUTES.PROFILE;
      case "share":
        return PAGES_ROUTES.LESSONS_LIST;
      default:
        return PAGES_ROUTES.NOTIFICATIONS;
    }
  };

  function notifyUser(notification: AppNotifications) {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
      return null;
    } else if (Notification.permission === "granted") {
      console.log("Notification permission granted.");
      const browserNotification = new Notification(notification.message, {
        tag: `quizzer-notification-${notification._id}`,
      });
      browserNotification.onclick = () => {
        console.log("Notification was read");

        window.focus();
        navigate(getNotificationRoute(notification));
        handleRead(notification._id);
      };
      browserNotification.onclose = () => {
        console.log("Notification was closed");
        dispatch(deleteNotificationAsync(notification._id));
      };
      return browserNotification;
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          const browserNotification = new Notification(notification.message, {
            tag: `quizzer-notification-${notification._id}`,
          });
          return browserNotification;
        }
      });
      return null;
    }
    return null;
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
    const unreadIds = new Set(unreadMessages.map((message) => message._id));

    activeNotifications.current.forEach(
      (browserNotification, notificationId) => {
        if (!unreadIds.has(notificationId)) {
          console.log(
            `Closing browser notification for read message: ${notificationId}`
          );
          browserNotification.onclose = null; // prevent it triggering onclose which removes the notification in the app
          browserNotification.close();
          activeNotifications.current.delete(notificationId);
        }
      }
    );
    unreadMessages.forEach((notification) => {
      if (!activeNotifications.current.has(notification._id)) {
        const browserNotification = notifyUser(notification);
        if (browserNotification) {
          activeNotifications.current.set(
            notification._id,
            browserNotification
          );
        }
      }
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
