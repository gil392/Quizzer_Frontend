import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";

const FriendsNotFound: React.FC = () => {
  const classes = useStyles();

  return (
    <Stack alignItems="center" p={4}>
      <Box
        component="img"
        src="/images/friendsNotFound.png"
        className={classes.container}
      />
      <Typography variant="h4">Learn And Share Lessons With Friends</Typography>
    </Stack>
  );
};

export default FriendsNotFound;
