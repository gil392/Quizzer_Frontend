import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReplayIcon from "@mui/icons-material/Replay";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Rating,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { QuizAttempt, QuizData } from "../../../api/quiz/types";
import EditableTitleWithActions from "../../../components/EditabletitleWithActions";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useStyles from "./QuizItem.styles";
import { rateQuiz } from "../../../api/quiz/api";
import { GenericIconButton } from "../../../components/GenericIconButton";
import { PAGES_ROUTES } from "../../../routes/routes.const";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchQuizAttempts } from "../../../store/attemptReducer";
import QuizTimer from "../../quiz/QuizTimer";
import { areAllQuestionsSubmitted } from "../../quiz/Utils";

type QuizItemProps = {
  quiz: QuizData;
  deleteQuiz: () => void;
  updateQuizTitle: (newTitle: string) => void;
};

const QuizItem: React.FC<QuizItemProps> = ({
  quiz,
  deleteQuiz,
  updateQuizTitle,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const attempts = useSelector(
    (state: RootState) => state.attempt.attemptsByQuiz[quiz._id]
  );
  const [loadingAttempts, setLoadingAttempts] = useState<boolean>(false);

  const handleRetakeQuiz = () => {
    navigate(PAGES_ROUTES.QUIZ, {
      state: { quizId: quiz._id, quizSettings: quiz.settings },
    });
  };

  const handleViewAttempt = (attempt: QuizAttempt) => {
    navigate(PAGES_ROUTES.QUIZ, { state: { attempt } });
  };

  const handleContinueAttempt = (attemptToContinue: QuizAttempt) => {
    navigate(PAGES_ROUTES.QUIZ, { state: { attemptToContinue } });
  };

  useEffect(() => {
    const fetchAttempts = async () => {
      if (!attempts) {
        try {
          setLoadingAttempts(true);
          await dispatch(fetchQuizAttempts(quiz._id)).unwrap();
        } catch (error) {
          console.error("Error fetching quiz attempts:", error);
        } finally {
          setLoadingAttempts(false);
        }
      }
    };

    fetchAttempts();
  }, [quiz._id]);

  const [rating, setRating] = useState<number | null>(quiz.rating);

  const handleRateQuiz = async (newRating: number | null) => {
    await rateQuiz(quiz._id, newRating);
    setRating(newRating);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <EditableTitleWithActions
          title={quiz.title}
          onSave={(newTitle) => updateQuizTitle(newTitle)}
          onDelete={deleteQuiz}
        />
        <GenericIconButton
          icon={<ReplayIcon />}
          title="Retake Quiz"
          onClick={handleRetakeQuiz}
        />
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Attempts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {loadingAttempts ? (
            <Typography variant="body2">Loading attempts...</Typography>
          ) : attempts && attempts.length > 0 ? (
            attempts.map((attempt, index) => {
              const timeLeft = attempt.expiryTime - new Date().getTime();
              const isFinished =
                timeLeft && areAllQuestionsSubmitted(quiz, attempt);
              return (
                <Box key={attempt._id} className={classes.AttemptContainer}>
                  <Typography variant="body1">
                    {index + 1}. Score: {attempt.score} / 100
                  </Typography>
                  {!isFinished && <QuizTimer initialTime={timeLeft} />}

                  <GenericIconButton
                    icon={<ArrowForwardIcon color="primary" />}
                    title={isFinished ? "View Attempt" : "Continue Attempt"}
                    onClick={
                      isFinished
                        ? () => handleViewAttempt(attempt)
                        : () => handleContinueAttempt(attempt)
                    }
                  />
                </Box>
              );
            })
          ) : (
            <Typography variant="body2">No attempts found.</Typography>
          )}
        </AccordionDetails>
      </Accordion>
      <Box className={classes.ratingContainer}>
        <Typography variant="body1">Rate this quiz:</Typography>
        <Rating
          name={`quiz-rating-${quiz._id}`}
          value={rating}
          onChange={(_, newValue) => handleRateQuiz(newValue)}
        />
      </Box>
      {rating && (
        <Typography variant="body2" mt={1}>
          Your rating: {rating}
        </Typography>
      )}
    </Box>
  );
};

export default QuizItem;
