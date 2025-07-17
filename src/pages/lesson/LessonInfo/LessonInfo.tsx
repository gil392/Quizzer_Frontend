import {
  Button,
  Card,
  CardActions,
  Collapse,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LessonData } from "../../../api/lesson/types";
import { QuizData } from "../../../api/quiz/types";
import QuizItem from "../QuizItem/QuizItem";
import useStyles from "./LessonInfo.styles";
import {
  deleteQuizAsync,
  fetchQuizzes,
  updateQuizAsync,
} from "../../../store/quizReducer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { Summary } from "../../summary/Summary";
import NoQuizzesFound from "./QuizNotFound/QuizNotFound";

interface LessonInfoProps {
  lesson: LessonData;
  onClose: () => void;
}

const LessonInfo: React.FC<LessonInfoProps> = ({ lesson, onClose }) => {
  const classes = useStyles();
  const quizzes = useSelector((state: RootState) => state.quizzes.quizzes);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState(true);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onCreateQuiz = () => {
    navigate("/quiz", { state: { lessonData: lesson } });
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
            href={getVideoLink(lesson)}
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            {getVideoLink(lesson)}
          </Link>
        </Stack>

        <Card className={classes.card}>
          <CardActions>
            <Button
              variant="outlined"
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
            <Summary summary={lesson.summary} />
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
          <NoQuizzesFound />
        )}
        <Box className={classes.buttonsContainer}>
          <Button variant="contained" onClick={onCreateQuiz}>
            Create New Quiz
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default LessonInfo;

export function getVideoLink(lesson: LessonData): string | undefined {
  return lesson.videoDetails
    ? `https://www.youtube.com/watch?v=${lesson.videoDetails.videoId}`
    : undefined;
}
