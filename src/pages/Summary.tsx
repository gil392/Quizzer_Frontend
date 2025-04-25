import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Skeleton,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { LessonData, QuizSettings } from "../services/backend/types";
import { generateLesson } from "../services/backend/service";
import useStyles from "./Summary.styles";

const SummaryPage: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateLesson(location.state?.videoUrl)
      .then((data: LessonData) => {
        setLessonData(data);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error("Error loading lesson:", error);
        setLessonData(null);
        setLoading(false);
      });
  }, [location.state]);

  const handleQuizNavigation = () => {
    if (!lessonData) {
      alert("Lesson data is not available.");
      return;
    }

    const quizSettings: QuizSettings = {
      checkType: "onSubmit",
      isRandomOrder: true,
      maxQuestionCount: 10,
      solvingTimeMs: 60000,
    };

    navigate("/quiz", { state: { lessonData, quizSettings } });
  };

  return (
    <Box className={classes.container}>
      <Card className={classes.card}>
        {loading ? (
          <Box className={classes.skeletonContainer}>
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Skeleton variant="rectangular" width="100%" height={50} />
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton variant="rectangular" width="100%" height={200} />
            <Skeleton variant="rectangular" width="100%" height={50} />
          </Box>
        ) : lessonData ? (
          <Box>
            <CardContent className={classes.cardContent}>
              <Typography variant="h5" component="div" gutterBottom>
                {lessonData.title}
              </Typography>
              <Typography variant="body1">{lessonData.summary}</Typography>
            </CardContent>

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
        ) : (
          <CardContent>
            <Typography variant="h6" color="error">
              Failed to load lesson data.
            </Typography>
          </CardContent>
        )}
      </Card>
    </Box>
  );
};

export default SummaryPage;
