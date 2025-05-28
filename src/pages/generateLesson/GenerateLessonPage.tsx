import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FeedbackType,
  QuestionsOrder,
  QuizSettings,
} from "../../api/quiz/types";
import { getLoggedUser } from "../../api/user/api";
import { useLocation } from "react-router-dom";
import LessonConfig from "../../components/lessonConfig/LessonConfig";
import { PAGES_ROUTES } from "../../routes/routes.const";
import { INITIAL_QUIZ_SETTINGS } from "../../api/quiz/constants";

const GenerateLessonPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [videoUrl, setVideoUrl] = useState<string>(
    location.state?.videoUrl || ""
  );

  const [feedbackType, setFeedbackType] = useState<FeedbackType>(
    INITIAL_QUIZ_SETTINGS.feedbackType
  );

  const [questionsOrder, setQuestionsOrder] = useState<QuestionsOrder>(
    INITIAL_QUIZ_SETTINGS.questionsOrder
  );

  const [maxQuestionCount, setMaxQuestionCount] = useState<number>(
    INITIAL_QUIZ_SETTINGS.maxQuestionCount
  );

  const [isManualCount, setIsManualCount] = useState<boolean>(
    INITIAL_QUIZ_SETTINGS.isManualCount
  );

  const setQuizSettings = (quizSettings: Partial<QuizSettings> | undefined) => {
    quizSettings?.feedbackType && setFeedbackType(quizSettings.feedbackType);
    quizSettings?.questionsOrder &&
      setQuestionsOrder(quizSettings.questionsOrder);
    quizSettings?.maxQuestionCount &&
      setMaxQuestionCount(quizSettings.maxQuestionCount);
    quizSettings?.isManualCount && setIsManualCount(quizSettings.isManualCount);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getLoggedUser();
        setQuizSettings(data.settings);
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    fetchUser();
  }, []);

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
      state: { videoUrl, quizSettings },
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
