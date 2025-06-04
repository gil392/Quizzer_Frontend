import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FeedbackType,
  QuestionsOrder,
  QuizSettings,
} from "../../api/quiz/types";
import { useLocation } from "react-router-dom";
import LessonConfig from "../../components/lessonConfig/LessonConfig";
import { PAGES_ROUTES } from "../../routes/routes.const";
import { INITIAL_QUIZ_SETTINGS } from "../../api/quiz/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const GenerateLessonPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [videoUrl, setVideoUrl] = useState<string>(
    location.state?.videoUrl || ""
  );
  const relatedLessonId = location.state?.relatedLessonId || null;
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);

  const [feedbackType, setFeedbackType] = useState<FeedbackType>(
    INITIAL_QUIZ_SETTINGS.feedbackType
  );

  const [questionsOrder, setQuestionsOrder] = useState<QuestionsOrder>(
    loggedUser?.settings?.questionsOrder ?? INITIAL_QUIZ_SETTINGS.questionsOrder
  );

  const [maxQuestionCount, setMaxQuestionCount] = useState<number>(
    loggedUser?.settings?.maxQuestionCount ??
      INITIAL_QUIZ_SETTINGS.maxQuestionCount
  );

  const [isManualCount, setIsManualCount] = useState<boolean>(
    loggedUser?.settings?.isManualCount ?? INITIAL_QUIZ_SETTINGS.isManualCount
  );

  const handleSummaryNavigation = (): void => {
    const quizSettings: QuizSettings = {
      feedbackType,
      maxQuestionCount,
      isRandomOrder: questionsOrder !== "random",
      solvingTimeMs: INITIAL_QUIZ_SETTINGS.solvingTimeMs,
      questionsOrder,
      isManualCount,
    };
    navigate(PAGES_ROUTES.SUMMARY, {
      state: { videoUrl, quizSettings, relatedLessonId },
    });
  };

  return (
    <Box sx={{ width: "60vw", margin: "auto" }}>
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
        feedbackType={feedbackType}
        setFeedbackType={setFeedbackType}
        questionsOrder={questionsOrder}
        setQuestionsOrder={setQuestionsOrder}
        maxQuestionCount={maxQuestionCount}
        setMaxQuestionCount={setMaxQuestionCount}
        isManualCount={isManualCount}
        setIsManualCount={setIsManualCount}
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
