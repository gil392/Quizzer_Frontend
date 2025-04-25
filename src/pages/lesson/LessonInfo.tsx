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

  return (
    <Box
      sx={{
        display: "flex",
        gap: "2vw",
        maxWidth: "100%",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          flex: 6,
          minWidth: 0, // allows box to shrink if needed, to let overflow work
        }}
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "0.5vh",
          }}
        >
          {lesson.title}
        </Typography>
        <Card
          sx={{
            width: "100%",
          }}
        >
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
            sx={{
              width: "100%",
            }}
          >
            <CardContent>
              <Typography variant="body2">{lesson.summary}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Box>

      <Box
        sx={{
          flex: 4,
          minWidth: 0, // allows box to shrink if needed, to let overflow work
        }}
      >
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
            sx={{ marginBottom: "1rem" }}
          >
            No quizzes available for this lesson.
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
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
