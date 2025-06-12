import { Box, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";

const FriendsNotFound: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.root}>
      <Stack alignItems="center" p={4}>
        <Box
          component="img"
          src="https://img.freepik.com/premium-vector/two-little-kids-study-together-reading-book-illustration_7084-612.jpg"
          className={classes.container}
        />
        <Typography variant="h4">
          Learn And Share Lessons With Friends
        </Typography>
      </Stack>
    </Paper>
  );
};

export default FriendsNotFound;
