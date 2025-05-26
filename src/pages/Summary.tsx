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
import { generateLesson } from "../api/lesson/api";
import { LessonData } from "../api/lesson/types";
import { PAGES_ROUTES } from "../routes/routes.const";
import useStyles from "./Summary.styles";
import { generateQuiz } from "../api/quiz/api";
import { toastWarning } from "../utils/utils";
import RelatedVideos from "./lesson/RelatedVideo/RelatedVideos";

const SummaryPage: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateLesson(location.state?.videoUrl)
      .then(({ data }) => {
        setLessonData(data);
        setLoading(false);
      })
      .catch((error: any) => {
        console.error("Error loading lesson:", error);
        setLessonData(null);
        setLoading(false);
      });
  }, [location.state]);

  const handleQuizNavigation = async () => {
    if (!lessonData) {
      toastWarning("Lesson data is not available.");
      return;
    }

    try {
      const { data: quizData } = await generateQuiz(
        lessonData._id,
        location.state?.quizSettings
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
    <Box className={classes.container} sx={{ display: "flex", gap: 4 }}>
      <Card className={classes.card} sx={{ flex: 2 }}>
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
      {!loading && lessonData && (
        <Box sx={{ flex: 1, minWidth: 340 }}>
          <RelatedVideos lessonId={lessonData._id} />
        </Box>
      )}
    </Box>
  );
};

export default SummaryPage;
