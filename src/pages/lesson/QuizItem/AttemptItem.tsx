import { Box, Typography } from "@mui/material";
import { QuizAttempt } from "../../../api/quiz/types";
import { GenericIconButton } from "../../../components/GenericIconButton";
import QuizTimer from "../../quiz/QuizTimer";
import { PAGES_ROUTES } from "../../../routes/routes.const";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import useStyles from "./AttemptItem.styles";
import { LessonData } from "../../../api/lesson/types";
import TwitterShareButton from "../../userProfile/components/TwitterShareButton";
import WhatsAppShareButton from "../../userProfile/components/WhatsappShareButton";

type AttemptItemProps = {
  attempt: QuizAttempt;
  index: number;
  isFinished: boolean | undefined;
  lesson: LessonData;
};

export function AttemptItem({
  attempt,
  index,
  isFinished,
  lesson,
}: AttemptItemProps) {
  const navigate = useNavigate();
  const classes = useStyles();
  const shareMessage = `I completed an attempt for the lesson "${lesson.title}" on Quizzer and got ${attempt.score} / 100!`;
  const messageEmojis = `${attempt.score >= 80 ? "🎉" : ""} ${
    attempt.score >= 60 ? "😎" : ""
  } ${attempt.score >= 90 ? "🏆" : ""}`;

  const handleViewAttempt = (attempt: QuizAttempt) => {
    navigate(PAGES_ROUTES.QUIZ, {
      state: { viewAttempt: attempt, lessonData: lesson },
    });
  };

  const handleContinueAttempt = (attemptToContinue: QuizAttempt) => {
    navigate(PAGES_ROUTES.QUIZ, {
      state: { attemptToContinue, lessonData: lesson },
    });
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
      <Box>
        {(isFinished || timeLeft < 0) && (
          <>
            <WhatsAppShareButton message={shareMessage} />
            <TwitterShareButton message={shareMessage + messageEmojis} />
          </>
        )}

        <GenericIconButton
          icon={<ArrowForwardIcon color="primary" />}
          title={
            isFinished || timeLeft < 0 ? "View Attempt" : "Continue Attempt"
          }
          onClick={
            isFinished || timeLeft < 0
              ? () => handleViewAttempt(attempt)
              : () => handleContinueAttempt(attempt)
          }
        />
      </Box>
    </Box>
  );
}
