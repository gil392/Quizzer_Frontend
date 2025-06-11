import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { Notification } from "../../../api/notification/types.ts";
import { useState, useEffect } from "react";
import DoneIcon from "@mui/icons-material/Done";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useStyles from "./NotificationCard.styles.ts";
import { formatNotificationTime } from "../../../utils/utils.ts";
import { useNavigate } from "react-router-dom";
import { Launch } from "@mui/icons-material";

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
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(false);
  }, [notification]);

  const handleRead = async () => {
    if (notification.read) return;
    setLoading(true);
    await onRead(notification._id);
    setLoading(false);
  };

  const handleCheckItOut = async () => {
    if (!notification.read) {
      await onRead(notification._id);
    }
    if (notification.relatedEntityId) {
      navigate(`/${notification.relatedEntityId}`);
    }
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
        {notification.relatedEntityId && notification.entityType && (
          <Button
            variant={notification.read ? "outlined" : "contained"}
            color="primary"
            startIcon={notification.read ? <Launch /> : undefined}
            onClick={handleCheckItOut}
            sx={{ marginLeft: 1 }}
          >
            {"Check it out"}
          </Button>
        )}
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
