import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Rating,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { QuizData } from "../../../services/backend/types";
import EditableTitleWithActions from "../../../components/EditabletitleWithActions";
import useStyles from "./QuizItem.styles";
import { rateQuiz } from "../../../services/backend/service";

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
  const [rating, setRating] = useState<number | null>(null);

  const handleRateQuiz = async (newRating: number | null) => {
    if (newRating === null) return;
    await rateQuiz(quiz._id, "Gil", newRating);
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
      <Box mt={2}>
        <Typography variant="body1">Rate this quiz:</Typography>
        <Rating
          name={`quiz-rating-${quiz._id}`}
          value={rating}
          onChange={(event, newValue) => handleRateQuiz(newValue)}
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
