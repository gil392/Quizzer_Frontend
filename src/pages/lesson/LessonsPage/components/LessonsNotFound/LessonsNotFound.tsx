import { Box, Link, Stack, Typography } from "@mui/material";
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

      <Typography variant="h4" className={classes.title}>
        Haven't had a lesson?
      </Typography>
      <Typography variant="body1" className={classes.message}>
        Every great quizzer starts somewhere. This is your blank canvas.{" "}
        <Link
          component="button"
          underline="hover"
          onClick={() => navigate(PAGES_ROUTES.GENERATE_LESSON)}
        >
          create your first lesson!
        </Link>
      </Typography>
    </Stack>
  );
};

export default LessonsNotFound;
