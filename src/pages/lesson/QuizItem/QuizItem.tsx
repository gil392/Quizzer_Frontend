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
import { getQuizAttempts } from "../../../api/quiz/api";
import EditableTitleWithActions from "../../../components/EditabletitleWithActions";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useStyles from "./QuizItem.styles";
import { rateQuiz } from "../../../api/quiz/api";
import { GenericIconButton } from "../../../components/GenericIconButton";

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
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loadingAttempts, setLoadingAttempts] = useState<boolean>(true);

  const handleRetakeQuiz = () => {
    navigate("/quiz", {
      state: { quizId: quiz._id, quizSettings: quiz.settings },
    });
  };

  const handleViewAttempt = (attempt: QuizAttempt) => {
    navigate("/quiz", { state: { attempt } });
  };

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        setLoadingAttempts(true);
        const { data } = await getQuizAttempts(quiz._id);
        setAttempts(data);
      } catch (error) {
        console.error("Error fetching quiz attempts:", error);
      } finally {
        setLoadingAttempts(false);
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
          ) : attempts.length > 0 ? (
            attempts.map((attempt, index) => (
              <Box key={attempt._id} className={classes.AttemptContainer}>
                <Typography variant="body1">
                  {index + 1}. Score: {attempt.score} / 100
                </Typography>
                <GenericIconButton
                  icon={<ArrowForwardIcon color="primary" />}
                  title="View Attempt"
                  onClick={() => handleViewAttempt(attempt)}
                />
              </Box>
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
      {rating && (
        <Typography variant="body2" mt={1}>
          Your rating: {rating}
        </Typography>
      )}
    </Box>
  );
};

export default QuizItem;
