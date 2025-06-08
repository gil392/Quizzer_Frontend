import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { Notification } from "../../../api/notifications/types";
import { useState, useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useStyles from "./NotificationCard.styles.ts";
import { formatNotificationTime } from "../../../utils/utils.ts";

interface NotificationCardProps {
  notification: Notification;
  onRead: (id: string) => Promise<void>;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onRead,
}) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles({ isRead: notification.read });

  useEffect(() => {
    setLoading(false);
  }, [notification]);

  const handleRead = async () => {
    if (notification.read) return;
    setLoading(true);
    await onRead(notification._id);
    setLoading(false);
  };

  return (
    <Card
      variant={notification.read ? "outlined" : "elevation"}
      className={classes.card}
    >
      <Box className={classes.iconBox}>
        <NotificationsIcon
          color={notification.read ? "disabled" : "primary"}
          fontSize="large"
        />
      </Box>
      <CardContent className={classes.content}>
        <Typography variant="h6">{notification.message}</Typography>
        <Typography variant="caption" color="text.secondary">
          {formatNotificationTime(notification.createdAt)}
        </Typography>
      </CardContent>
      <Box className={classes.buttonBox}>
        <Button
          variant={notification.read ? "outlined" : "contained"}
          color="primary"
          startIcon={notification.read ? <DoneIcon /> : undefined}
          onClick={handleRead}
          disabled={notification.read || loading}
        >
          {loading ? (
            <CircularProgress size={18} color="inherit" />
          ) : notification.read ? (
            "Read"
          ) : (
            "Mark as Read"
          )}
        </Button>
      </Box>
    </Card>
  );
};

export default NotificationCard;
