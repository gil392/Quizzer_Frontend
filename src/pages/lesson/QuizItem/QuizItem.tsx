import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
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
  const [message, setMessage] = useState<string | null>(null);

  const handleRateQuiz = async (ratingValue: number) => {
    try {
      const response = await rateQuiz(quiz._id, "Gil", ratingValue);
      setMessage(response.message);
      setRating(ratingValue);
    } catch (error) {
      setMessage("Failed to rate quiz. Please try again.");
    }
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
      <div>
        <button onClick={() => handleRateQuiz(1)}>Rate 1</button>
        <button onClick={() => handleRateQuiz(5)}>Rate 5</button>
      </div>
      {rating && <p>Your rating: {rating}</p>}
      {message && <p>{message}</p>}
    </Box>
  );
};

export default QuizItem;
