import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useStyles } from "./styles";
import { PAGES_ROUTES } from "../../../../../routes/routes.const";
import { useNavigate } from "react-router-dom";

const LessonsNotFound: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Paper elevation={3} className={classes.root}>
      <Stack spacing={2} alignItems="center" p={4}>
        <Box
          component="img"
          src="/images/lessonsNotFound.png"
          className={classes.container}
        />

        <Typography variant="h5">Haven't had a lesson?</Typography>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            navigate(PAGES_ROUTES.GENERATE_LESSON);
          }}
        >
          <Typography variant="button">Create Your First Lesson</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

export default LessonsNotFound;
