import Box from "@mui/material/Box";
import {
  LessonData,
  QuizData,
  QuizSettings,
} from "../../services/backend/types";
import { useState, useEffect } from "react";
import {
  deleteQuiz,
  getQuizzes,
  updateQuiz,
} from "../../services/backend/service";
import QuizItem from "./QuizItem";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Collapse,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useStyles from "./LessonInfo.styles";

interface LessonInfoProps {
  lesson: LessonData;
  onClose: () => void;
}

const LessonInfo: React.FC<LessonInfoProps> = ({ lesson, onClose }) => {
  const [quizzes, setQuizzes] = useState<QuizData[]>([]);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(true); // Default to true (show summary)

  const navigate = useNavigate();
  /** TODO: Issue 14 (Itay)- get these settings not hard-coded */
  const quizSettings: QuizSettings = {
    checkType: "onSubmit",
    isRandomOrder: true,
    maxQuestionCount: 10,
    solvingTimeMs: 60000,
  };

  const onCreateQuiz = () => {
    navigate("/quiz", { state: { lessonData: lesson, quizSettings } });
  };

  useEffect(() => {
    const fetchQuizzesByLessonId = async () => {
      try {
        const response = await getQuizzes(lesson._id);
        setQuizzes(response);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchQuizzesByLessonId();
  }, []);

  const handleDeleteQuiz = async (quizId: string) => {
    await deleteQuiz(quizId);
    setQuizzes((prevQuizzes) =>
      prevQuizzes.filter((quiz) => quiz._id !== quizId)
    );
  };

  const handleUpdateQuiz = async (quiz: QuizData) => {
    await updateQuiz(quiz._id, quiz);
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((q) => (q._id === quiz._id ? quiz : q))
    );
  };

  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.leftBox}>
        <Typography
          sx={{
            fontSize: "1.2rem", // Your desired font size
            fontWeight: "bold", // Your desired font weight
            marginBottom: "0.5vh", // Your desired margin
          }}
        >
          {lesson.title}
        </Typography>
        <Card className={classes.card}>
          <CardActions>
            <Button
              size="small"
              onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
            >
              {isSummaryExpanded ? "Hide Summary" : "Show Summary"}
            </Button>
          </CardActions>
          <Collapse
            in={isSummaryExpanded}
            timeout="auto"
            unmountOnExit
            className={classes.collapseContent}
          >
            <CardContent>
              <Typography variant="body2">{lesson.summary}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Box>

      <Box className={classes.rightBox}>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <QuizItem
              key={quiz._id}
              quiz={quiz}
              deleteQuiz={() => handleDeleteQuiz(quiz._id)}
              updateQuizTitle={(newTitle: string) => {
                handleUpdateQuiz({ ...quiz, title: newTitle });
              }}
            />
          ))
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.noQuizzesText}
          >
            No quizzes available for this lesson.
          </Typography>
        )}
        <Box className={classes.buttonsContainer}>
          <Button variant="outlined" color="inherit" onClick={onCreateQuiz}>
            Create New Quiz
          </Button>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LessonInfo;
