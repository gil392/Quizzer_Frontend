import React, { useState } from "react";
import NotificationCard from "../NotificationCard/NotificationCard";
import NotificationSkeleton from "../NotificationSkeleton/NotificationSkeleton";
import { Box, Typography } from "@mui/material";
import useStyles from "./NotificationPage.styles";
import LessonInfo from "../../lesson/LessonInfo/LessonInfo";
import { LessonData } from "../../../api/lesson/types";
import { usePopupNavigation } from "../../../hooks/usePopupNavigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { markNotificationAsReadAsync } from "../../../store/notificationReducer";

const NotificationPage: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch<AppDispatch>();

  const [selectedLesson, setSelectedLesson] = useState<LessonData | undefined>(
    undefined
  );
  const { openPopup, closePopup } = usePopupNavigation(
    "/notifications",
    "lesson",
    () => setSelectedLesson(undefined)
  );

  const { notifications, fetchStatus: fetchNotificationsStatus } = useSelector(
    (state: RootState) => state.notifications
  );

  const handleRead = async (id: string) => {
    await dispatch(markNotificationAsReadAsync(id));
    window.dispatchEvent(new Event("notifications-updated"));
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
          {fetchNotificationsStatus === "loading" && (
            <>
              <NotificationSkeleton />
              <NotificationSkeleton />
              <NotificationSkeleton />
            </>
          )}
          {fetchNotificationsStatus !== "loading" &&
            notifications &&
            notifications.length === 0 && (
              <Typography className={classes.empty}>
                You have no notifications.
              </Typography>
            )}
          {fetchNotificationsStatus !== "loading" &&
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
