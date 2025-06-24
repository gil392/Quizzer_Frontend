import { useEffect, useState, useRef } from "react";
import { Badge, IconButton } from "@mui/material";
import { NotificationsOutlined } from "@mui/icons-material";
import {
  MAX_MESSAGES_BADGE_CONTENT,
  NOTIFICATIONS_INTERVAL_MS,
} from "../const";
import useStyles from "../styles";
import { getNotifications } from "../../../api/notification/api";
import { Notification } from "../../../api/notification/types";

interface NotificationBellProps {
  onClick?: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ onClick }) => {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const classes = useStyles({});

  const fetchNotifications = async () => {
    try {
      const { data } = await getNotifications();
      setUnreadCount(
        data.filter((notificaion: Notification) => !notificaion.read).length
      );
    } catch {
      setUnreadCount(0);
    }
  };

  useEffect(() => {
    fetchNotifications();
    intervalRef.current = setInterval(
      fetchNotifications,
      NOTIFICATIONS_INTERVAL_MS
    );

    const handleUpdate = () => fetchNotifications();
    window.addEventListener("notifications-updated", handleUpdate);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("notifications-updated", handleUpdate);
    };
  }, []);

  return (
    <IconButton onClick={onClick} aria-label="notifications">
      <Badge
        badgeContent={unreadCount > 0 ? unreadCount : null}
        max={MAX_MESSAGES_BADGE_CONTENT}
        color="primary"
        classes={{ badge: classes.badge }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <NotificationsOutlined
          className={classes.notificaion}
          color="inherit"
        />
      </Badge>
    </IconButton>
  );
};

export default NotificationBell;
