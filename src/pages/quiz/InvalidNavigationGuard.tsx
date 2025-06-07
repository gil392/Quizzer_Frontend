import React from "react";
import { Box, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PAGES_ROUTES } from "../../routes/routes.const";
import useStyles from "./Quiz.styles";

interface QuizInvalidGuardProps {
  missingData: string;
  show: boolean;
}

const InvalidNavigationGuard: React.FC<QuizInvalidGuardProps> = ({
  show,
  missingData,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  if (!show) return null;

  return (
    <Box
      className={classes.container}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
    >
      <Paper elevation={4} sx={{ p: 4, maxWidth: 500, width: "100%" }}>
        <Typography
          variant="h5"
          color="error"
          gutterBottom
          align="center"
          fontWeight={700}
        >
          Oops! Something went wrong.
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          align="center"
          sx={{ mb: 3 }}
        >
          <b>{missingData}</b> is missing.
          <br />
          Please return to the lessons page to continue.
        </Typography>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(PAGES_ROUTES.LESSON)}
            size="large"
          >
            Go to Lessons
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default InvalidNavigationGuard;
