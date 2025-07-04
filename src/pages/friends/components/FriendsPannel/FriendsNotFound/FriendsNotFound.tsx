import { Box, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";

const FriendsNotFound: React.FC = () => {
  const classes = useStyles();

  return (
    <Box>
      <Box
        component="img"
        src="/images/friendsNotFound.png"
        className={classes.image}
      />
      <Typography variant="h4" className={classes.title}>
        You're flying solo
      </Typography>
      <Typography variant="body1" className={classes.message}>
        No friends found. Let's search for quiz buddies!
      </Typography>
    </Box>
  );
};

export default FriendsNotFound;
