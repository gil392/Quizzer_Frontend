import { Box, Link, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./NotificationNotFound.styles";
import { PAGES_ROUTES } from "../../../routes/routes.const";
import { useNavigate } from "react-router-dom";

const NotificationsNotFound: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box textAlign="center" p={4}>
      <Box
        component="img"
        src="/images/notificationsNotFound.png"
        alt="No notifications"
        className={classes.image}
      />
      <Typography variant="h4" className={classes.title}>
        No notifications at the moment.
      </Typography>
      <Typography variant="body1" className={classes.message}>
        Time to relax... or{" "}
        <Link
          component="button"
          underline="hover"
          onClick={() => navigate(PAGES_ROUTES.GENERATE_LESSON)}
        >
          create another lesson!
        </Link>
      </Typography>
    </Box>
  );
};

export default NotificationsNotFound;
