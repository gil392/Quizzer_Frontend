import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from "./Summary.styles";
import { generateQuiz } from "../api/quiz/api";
import { toastWarning } from "../utils/utils";
import { QuizSettings } from "../api/quiz/types";
import { LessonData } from "../api/lesson/types";
import { PAGES_ROUTES } from "../routes/routes.const";

interface SummaryProps {
  lessonData: LessonData;
  quizSettings?: QuizSettings;
}

const Summary: React.FC<SummaryProps> = ({ lessonData, quizSettings }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleQuizNavigation = async () => {
    if (!lessonData) {
      toastWarning("Lesson data is not available.");
      return;
    }

    try {
      const { data: quizData } = await generateQuiz(
        lessonData._id,
        quizSettings
      );
      navigate(PAGES_ROUTES.QUIZ, {
        state: { lessonData, quizId: quizData._id },
      });
    } catch (error) {
      console.error("Error generating quiz:", error);
      toastWarning("Failed to generate quiz. Please try again.");
    }
  };

  return (
    <Box className={classes.container}>
      <Typography variant="h5" className={classes.header}>
        Summary
      </Typography>
      <Box className={classes.cardContent}>
        <Typography variant="h5" component="div" gutterBottom>
          {lessonData.title}
        </Typography>
        <Typography variant="body1">{lessonData.summary}</Typography>
      </Box>
      <Box className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleQuizNavigation}
        >
          Go to Quiz
        </Button>
      </Box>
    </Box>
  );
};

export default Summary;
