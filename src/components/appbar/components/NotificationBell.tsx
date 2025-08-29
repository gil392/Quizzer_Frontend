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
import { Notification as AppNotification } from "../../../api/notification/types";
import { useNavigate } from "react-router-dom";
import { PAGES_ROUTES } from "../../../routes/routes.const";

interface NotificationBellProps {
  onClick?: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ onClick }) => {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();
  const activeComputerNotifications = useRef<Map<string, Notification>>(
    new Map()
  );
  const navigate = useNavigate();

  const handleRead = async (id: string) => {
    await dispatch(markNotificationAsReadAsync(id));
    window.dispatchEvent(new Event("notifications-updated"));
  };

  const getNotificationRoute = (notification: AppNotification): string => {
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

  function notifyUser(notification: AppNotification) {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      console.log("Notification permission granted.");
      createComputerNotification(notification);
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          createComputerNotification(notification);
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
    const unreadIds = new Set(unreadMessages.map((message) => message._id));

    activeComputerNotifications.current.forEach(
      (computerNotification, notificationId) => {
        if (!unreadIds.has(notificationId)) {
          console.log(
            `Closing browser notification for read message: ${notificationId}`
          );
          computerNotification.onclose = null; // prevent it triggering onclose which removes the notification in the app
          computerNotification.close();
          activeComputerNotifications.current.delete(notificationId);
        }
      }
    );
    unreadMessages.forEach((notification) => {
      if (!activeComputerNotifications.current.has(notification._id)) {
        notifyUser(notification);
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

  function createComputerNotification(notification: AppNotification) {
    const computerNotification = new Notification(notification.message, {
      tag: `quizzer-notification-${notification._id}`,
    });
    computerNotification.onclick = () => {
      console.log("Computer notification was read");

      window.focus();
      navigate(getNotificationRoute(notification));
      handleRead(notification._id);
    };
    computerNotification.onclose = () => {
      console.log("Computer notification was closed");
      dispatch(deleteNotificationAsync(notification._id));
    };
    activeComputerNotifications.current.set(
      notification._id,
      computerNotification
    );
  }
};

export default NotificationBell;
