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

const SummaryPage: React.FC = () => {
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

    // TODO: move to home page
    const quizSettings: QuizSettings = {
      checkType: "onSubmit",
      isRandomOrder: true,
      maxQuestionCount: 10,
      solvingTimeMs: 60000,
    };

    navigate("/quiz", { state: { lessonData, quizSettings } });
  };

  return (
    <Box sx={{ width: "50vw", margin: "auto", padding: 2 }}>
      <Card
        sx={{
          maxWidth: "50vw",
          boxShadow: 10,
          paddingTop: 2,
          height: "85vh",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#555",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
        }}
      >
        {loading ? (
          <Box sx={{ padding: 2 }}>
            <Skeleton variant="text" width="80%" height={40} />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              sx={{ marginTop: 2 }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={50}
              sx={{ marginTop: 2 }}
            />
            <Skeleton
              variant="text"
              width="80%"
              height={40}
              sx={{ marginTop: 6 }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              sx={{ marginTop: 2 }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={50}
              sx={{ marginTop: 2 }}
            />
          </Box>
        ) : lessonData ? (
          <Box>
            <CardContent sx={{ textAlign: "left" }}>
              <Typography variant="h5" component="div" gutterBottom>
                {lessonData.title}
              </Typography>
              <Typography variant="body1">{lessonData.summary}</Typography>
            </CardContent>

            <Box sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
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
