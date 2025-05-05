import { Box, Button, OutlinedInput, Slider, Typography } from "@mui/material";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGES_ROUTES } from "../../routes/routes.const";
import { QuizSettings } from "../../services/backend/types";
import "./GenerateLessonPage.css";
import { INITIAL_LESSON_CONFIG } from "../../components/lessonConfig/components/constants";
import LessonConfig from "../../components/lessonConfig/LessonConfig";

const LOW_QUESTIONS_COUNT = 5;
const MEDIUM_QUESTIONS_COUNT = 10;
const HIGH_QUESTIONS_COUNT = 20;
const MANUAL_QUESTIONS_COUNT_OPTION = -1;
const MANUAL_MIN_QUESTIONS_COUNT = 5;
const MANUAL_MAX_QUESTIONS_COUNT = 30;
const MANUAL_QUESTIONS_COUNT_STEP = 5;

interface QuestionCountOption {
  value: number;
  label: string;
}

const questionCountOptions: QuestionCountOption[] = [
  { value: LOW_QUESTIONS_COUNT, label: "Low (5)" },
  { value: MEDIUM_QUESTIONS_COUNT, label: "Medium (10)" },
  { value: HIGH_QUESTIONS_COUNT, label: "High (20)" },
  { value: MANUAL_QUESTIONS_COUNT_OPTION, label: "Manual" },
];

const GenerateLessonPage: React.FC = () => {
  const navigate = useNavigate();
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [quizSettings, setQuizSettings] = useState<QuizSettings>(
    INITIAL_LESSON_CONFIG
  );

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
