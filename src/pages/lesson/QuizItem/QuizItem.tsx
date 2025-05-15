import { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Rating,
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { QuizData } from "../../../api/quiz/types";
import EditableTitleWithActions from "../../../components/EditabletitleWithActions";
import useStyles from "./QuizItem.styles";
import { rateQuiz } from "../../../api/quiz/api";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { PAGES_ROUTES } from "../../../routes/routes.const"; // Import route constants

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
  const [rating, setRating] = useState<number | null>(quiz.rating);

  const handleRateQuiz = async (newRating: number | null) => {
    await rateQuiz(quiz._id, newRating);
    setRating(newRating);
  };

  const handleNavigateToQuiz = () => {
    navigate(`${PAGES_ROUTES.QUIZ}`, { state: { quizId: quiz._id } });
  };

  return (
    <Box className={classes.container} onClick={handleNavigateToQuiz}>
      <Box className={classes.header}>
        <EditableTitleWithActions
          title={quiz.title}
          onSave={(newTitle) => updateQuizTitle(newTitle)}
          onDelete={deleteQuiz}
        />
      </Box>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Attempts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {["Attempt 1", "Nice attempt"].map((attempt, index) => (
            <Box key={index} className={classes.accordionDetails}>
              <Typography variant="body1">
                {index + 1}. {attempt}
              </Typography>
            </Box>
          ))}
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
