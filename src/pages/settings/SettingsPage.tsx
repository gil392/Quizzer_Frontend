import { Box, Button } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { INITIAL_LESSON_CONFIG } from "../../components/lessonConfig/components/constants";
import LessonConfig from "../../components/lessonConfig/LessonConfig";
import { QuizSettings } from "../../api/quiz/types";
import { getLoggedUser } from "../../api/user/api";
import { useUserId } from "../../components/user/globalProvider";

const SettingsPage: FunctionComponent = () => {
  const [quizSettings, setQuizSettings] = useState<QuizSettings>(
    INITIAL_LESSON_CONFIG
  );

  const { userId } = useUserId();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getLoggedUser();
        console.log(data);
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    fetchUser();
  }, [userId]);

  const setDefaultSettings = () => {};

  return (
    <Box sx={{ width: "50%", margin: "auto" }}>
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
        onClick={setDefaultSettings}
      >
        Submit Changes
      </Button>
    </Box>
  );
};

export default SettingsPage;
