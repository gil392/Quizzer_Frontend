import {
  Box,
  Button,
  Card,
  CardContent,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStyles from "./Summary.styles";
import { useDispatch } from "react-redux";
import { LessonData } from "../../api/lesson/types";
import { PAGES_ROUTES } from "../../routes/routes.const";
import { createLessonAsync } from "../../store/lessonReducer";
import { generateQuizAsync } from "../../store/quizReducer";
import { AppDispatch } from "../../store/store";
import { toastWarning } from "../../utils/utils";

const SummaryPage: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function generateLessonData() {
      try {
        const data = await dispatch(
          createLessonAsync(location.state?.videoUrl)
        ).unwrap();
        setLessonData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading lesson:", error);
        setLessonData(null);
        setLoading(false);
      }
    }
    generateLessonData();
  }, [location.state]);

  const handleQuizNavigation = async () => {
    if (!lessonData) {
      toastWarning("Lesson data is not available.");
      return;
    }

    try {
      const data = await dispatch(
        generateQuizAsync({
          lessonId: lessonData._id,
          settings: location.state?.quizSettings,
        })
      ).unwrap();

      navigate(PAGES_ROUTES.QUIZ, {
        state: { lessonData, quizId: data._id },
      });
    } catch (error) {
      console.error("Error generating quiz:", error);
      toastWarning("Failed to generate quiz. Please try again.");
    }
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
