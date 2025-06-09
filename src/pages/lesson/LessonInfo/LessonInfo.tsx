import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LessonData } from "../../../api/lesson/types";
import { QuizData, QuizSettings } from "../../../api/quiz/types";
import QuizItem from "../QuizItem/QuizItem";
import useStyles from "./LessonInfo.styles";
import { INITIAL_QUIZ_SETTINGS } from "../../../api/quiz/constants";
import {
  deleteQuizAsync,
  fetchQuizzes,
  updateQuizAsync,
} from "../../../store/quizReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";

interface LessonInfoProps {
  lesson: LessonData;
  onClose: () => void;
}

const LessonInfo: React.FC<LessonInfoProps> = ({ lesson, onClose }) => {
  const classes = useStyles();
  const quizzes = useSelector((state: RootState) => state.quizzes.quizzes);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(true); // Default to true (show summary)
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const quizSettings: QuizSettings = INITIAL_QUIZ_SETTINGS;

  const onCreateQuiz = () => {
    navigate("/quiz", { state: { lessonData: lesson, quizSettings } });
  };

  useEffect(() => {
    const fetchQuizzesByLessonId = async () => {
      try {
        await dispatch(fetchQuizzes(lesson._id)).unwrap();
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    fetchQuizzesByLessonId();
  }, []);

  const handleDeleteQuiz = async (quizId: string) => {
    await dispatch(deleteQuizAsync(quizId));
  };

  const handleUpdateQuiz = async (quiz: QuizData) => {
    await dispatch(updateQuizAsync({ quizId: quiz._id, updatedData: quiz }));
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.leftBox}>
        <Typography className={classes.title}>{lesson.title}</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography>Video link:</Typography>
          <Link
            href={lesson.videoUrl}
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            {lesson.videoUrl}
          </Link>
        </Stack>

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
              lesson={lesson}
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
