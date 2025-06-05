import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FeedbackType,
  QuestionsOrder,
  QuizSettings,
} from "../../api/quiz/types";

import LessonConfig from "../../components/lessonConfig/LessonConfig";
import { PAGES_ROUTES } from "../../routes/routes.const";
import { INITIAL_QUIZ_SETTINGS } from "../../api/quiz/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getDefaultQuizSettings } from "../../components/lessonConfig/components/utils";

const GenerateLessonPage: React.FC = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);

  const defaultQuizSettings = getDefaultQuizSettings(loggedUser?.settings);

  const [quizSettings, setQuizSettings] =
    useState<QuizSettings>(defaultQuizSettings);

  const handleSummaryNavigation = (): void => {
    navigate(PAGES_ROUTES.SUMMARY, {
      state: { videoUrl, quizSettings },
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
        defaultQuizSettings={defaultQuizSettings}
        onChange={(quizSettings: QuizSettings) => {
          setQuizSettings(quizSettings);
        }}
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
