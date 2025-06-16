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
      <Typography variant="h4">Learn And Share Lessons With Friends</Typography>
    </Box>
  );
};

export default FriendsNotFound;
