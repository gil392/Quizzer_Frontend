import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PAGES_ROUTES } from "../../../../../routes/routes.const";
import { useStyles } from "./styles";

const LessonsNotFound: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Stack spacing={2} alignItems="center" p={4} width="45vw">
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
  );
};

export default LessonsNotFound;
