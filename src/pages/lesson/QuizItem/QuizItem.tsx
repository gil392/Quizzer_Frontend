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
import { QuizData } from "../../../api/quiz/types";
import EditableTitleWithActions from "../../../components/EditabletitleWithActions";
import useStyles from "./QuizItem.styles";
import { rateQuiz } from "../../../api/quiz/api";
import { GenericIconButton } from "../../../components/GenericIconButton";
import { PAGES_ROUTES } from "../../../routes/routes.const";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { fetchQuizAttempts } from "../../../store/attemptReducer";
import { areAllQuestionsSubmitted } from "../../quiz/Utils";
import { AttemptItem } from "./AttemptItem";
import { LessonData } from "../../../api/lesson/types";

type QuizItemProps = {
  quiz: QuizData;
  deleteQuiz: () => void;
  updateQuizTitle: (newTitle: string) => void;
  lesson: LessonData;
};

const QuizItem: React.FC<QuizItemProps> = ({
  quiz,
  deleteQuiz,
  updateQuizTitle,
  lesson,
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
      state: {
        quizId: quiz._id,
        quizSettings: quiz.settings,
        lessonData: lesson,
      },
    });
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
            attempts.map((attempt, index) => (
              <AttemptItem
                attempt={attempt}
                index={index}
                isFinished={areAllQuestionsSubmitted(quiz, attempt)}
                lesson={lesson}
              />
            ))
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
    </Box>
  );
};

export default QuizItem;
