import { Box, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./QuizNotFound.styles";

const NoQuizzesFound: React.FC = () => {
  const classes = useStyles();
  return (
    <Box textAlign="center" py={4}>
      <Box
        component="img"
        src="/images/noQuizzesFound.png"
        alt="No quizzes found"
        className={classes.image}
      />
      <Typography variant="h6" className={classes.title}>
        No quizzes available for this lesson yet.
      </Typography>
      <Typography variant="body2" className={classes.message}>
        You've got the summary, now bring on the questions!
      </Typography>
    </Box>
  );
};

export default NoQuizzesFound;
