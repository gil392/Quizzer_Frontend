import React, { useEffect, useState, useCallback } from "react";
import {
  getNotifications,
  markNotificationAsRead,
} from "../../../api/notification/api";
import { Notification } from "../../../api/notification/types";
import NotificationCard from "../NotificationCard/NotificationCard";
import NotificationSkeleton from "../NotificationSkeleton/NotificationSkeleton";
import { Box, Typography } from "@mui/material";
import useStyles from "./NotificationPage.styles";
import LessonInfo from "../../lesson/LessonInfo/LessonInfo";
import { LessonData } from "../../../api/lesson/types";
import { usePopupNavigation } from "../../../hooks/usePopupNavigation";

const NotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  const [selectedLesson, setSelectedLesson] = useState<LessonData | undefined>(
    undefined
  );
  const { openPopup, closePopup } = usePopupNavigation(
    "/notifications",
    "lesson",
    () => setSelectedLesson(undefined)
  );

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await getNotifications();
      setNotifications(data);
    } catch {
      setNotifications([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleRead = async (id: string) => {
    await markNotificationAsRead(id);
    window.dispatchEvent(new Event("notifications-updated"));

    fetchNotifications();
  };

  return (
    <>
      {selectedLesson !== undefined ? (
        <LessonInfo lesson={selectedLesson} onClose={closePopup} />
      ) : (
        <Box className={classes.root}>
          <Typography variant="h4" className={classes.title} gutterBottom>
            Notifications
          </Typography>
          {loading && (
            <>
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
            </>
          )}
          {!loading && notifications && notifications.length === 0 && (
            <Typography className={classes.empty}>
              You have no notifications.
            </Typography>
          )}
          {!loading &&
            notifications &&
            notifications.map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
                onRead={handleRead}
                setSelectedLesson={setSelectedLesson}
                openPopup={openPopup}
              />
            ))}
        </Box>
      )}
    </>
  );
};

export default NotificationPage;
