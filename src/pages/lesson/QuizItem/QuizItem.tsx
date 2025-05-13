import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReplayIcon from "@mui/icons-material/Replay";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { QuizAttempt, QuizData } from "../../../api/quiz/types";
import { getQuizAttempts } from "../../../api/quiz/api"; // Import the function
import EditableTitleWithActions from "../../../components/EditabletitleWithActions";
import useStyles from "./QuizItem.styles";

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
    navigate("/quiz", { state: { quizId: quiz._id, quizSettings: quiz.settings } });
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

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <EditableTitleWithActions
          title={quiz.title}
          onSave={(newTitle) => updateQuizTitle(newTitle)}
          onDelete={deleteQuiz}
        />
        <IconButton
          onClick={handleRetakeQuiz}
          aria-label="Retake Quiz"
          className={classes.retakeButton}
        >
          <ReplayIcon />
        </IconButton>
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
              <Box key={attempt._id} className={classes.accordionDetails}>
                <Typography variant="body1">
                  {index + 1}. Score: {attempt.score} / 100
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2">No attempts found.</Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default QuizItem;