import { Box, Typography } from "@mui/material";
import { QuizAttempt } from "../../../api/quiz/types";
import { GenericIconButton } from "../../../components/GenericIconButton";
import QuizTimer from "../../quiz/QuizTimer";
import { PAGES_ROUTES } from "../../../routes/routes.const";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import useStyles from "./AttemptItem.styles";
import { LessonData } from "../../../api/lesson/types";

type AttemptItemProps = {
  attempt: QuizAttempt;
  index: number;
  isFinished: boolean | undefined;
  lesson: LessonData;
};

export function AttemptItem({ attempt, index, isFinished, lesson }: AttemptItemProps) {
  const navigate = useNavigate();
  const classes = useStyles();

  const handleViewAttempt = (attempt: QuizAttempt) => {
    navigate(PAGES_ROUTES.QUIZ, { state: { viewAttempt: attempt, lessonData: lesson } });
  };

  const handleContinueAttempt = (attemptToContinue: QuizAttempt) => {
    navigate(PAGES_ROUTES.QUIZ, { state: { attemptToContinue, lessonData: lesson } });
  };

  const timeLeft = attempt.expiryTime - new Date().getTime();
  return (
    <Box key={attempt._id} className={classes.AttemptContainer}>
      <Typography variant="body1">
        {index + 1}.{" "}
        {isFinished || timeLeft < 0
          ? "Score: " + attempt.score + " / 100"
          : "Unfinished"}
      </Typography>
      {!isFinished && <QuizTimer initialTime={timeLeft} />}

      <GenericIconButton
        icon={<ArrowForwardIcon color="primary" />}
        title={isFinished || timeLeft < 0 ? "View Attempt" : "Continue Attempt"}
        onClick={
          isFinished || timeLeft < 0
            ? () => handleViewAttempt(attempt)
            : () => handleContinueAttempt(attempt)
        }
      />
    </Box>
  );
}
