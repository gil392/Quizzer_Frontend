import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { QuizSettings } from "../../api/quiz/types";
import { getDefaultQuizSettings } from "../../components/lessonConfig/components/utils";
import LessonConfig from "../../components/lessonConfig/LessonConfig";
import { PAGES_ROUTES } from "../../routes/routes.const";
import { RootState } from "../../store/store";
import useStyles from "../../components/lessonConfig/components/styles";

const GenerateLessonPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [videoUrl, setVideoUrl] = useState<string>(
    location.state?.videoUrl || ""
  );
  const relatedLessonGroupId = location.state?.relatedLessonGroupId || null;
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);

  const defaultQuizSettings = getDefaultQuizSettings(loggedUser?.settings);
  const classes = useStyles();
  const [quizSettings, setQuizSettings] =
    useState<QuizSettings>(defaultQuizSettings);

  const handleSummaryNavigation = (): void => {
    navigate(PAGES_ROUTES.SUMMARY, {
      state: { videoUrl, quizSettings, relatedLessonGroupId },
    });
  };

  return (
    <Box
      sx={{
        width: "60vw",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="img"
        src="/images/generateLesson.png"
        alt="Generate Lesson"
        className={classes.image}
      />
      <Typography variant="h6" gutterBottom>
        Insert YouTube Video
      </Typography>
      <OutlinedInput
        placeholder="youtube.com/watch?v=j0u7ub3m473"
        className={classes.typography}
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />

      <LessonConfig
        onChange={(quizSettings: QuizSettings) => {
          setQuizSettings(quizSettings);
        }}
      />

      <Button
        variant="contained"
        className={classes.button}
        onClick={handleSummaryNavigation}
        disabled={!videoUrl.trim()}
      >
        Generate Lesson
      </Button>
    </Box>
  );
};

export default GenerateLessonPage;
