import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { INITIAL_LESSON_CONFIG } from "../../components/lessonConfig/components/constants";
import LessonConfig from "../../components/lessonConfig/LessonConfig";
import { PAGES_ROUTES } from "../../routes/routes.const";
import { QuizSettings } from "../../api/quiz/types";
import { useUserId } from "../../components/user/globalProvider";
import { getLoggedUser } from "../../api/user/api";

const GenerateLessonPage: React.FC = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [quizSettings, setQuizSettings] = useState<QuizSettings>(
    INITIAL_LESSON_CONFIG
  );

  const { userId } = useUserId();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getLoggedUser();
        data?.defaultSettings && setQuizSettings(data?.defaultSettings);
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleSummaryNavigation = (): void => {
    const quizSettingsToSend: QuizSettings = {
      ...quizSettings,
      isRandomOrder: quizSettings.questionsOrder !== "random",
    };
    navigate(PAGES_ROUTES.SUMMARY, {
      state: { videoUrl, quizSettingsToSend },
    });
  };

  return (
    <Box sx={{ width: "50%", margin: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Insert YouTube Video
      </Typography>
      <OutlinedInput
        placeholder="youtube.com/watch?v=j0u7ub3m473"
        sx={{
          borderRadius: "8px",
          width: "100%",
          height: "3rem",
          marginBottom: 3,
        }}
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      <LessonConfig
        quizSettings={quizSettings}
        setQuizSettings={setQuizSettings}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "100%",
          height: "3rem",
          borderRadius: "8px",
          marginTop: 3,
        }}
        onClick={handleSummaryNavigation}
        disabled={!videoUrl.trim()}
      >
        Generate Lesson
      </Button>
    </Box>
  );
};

export default GenerateLessonPage;
