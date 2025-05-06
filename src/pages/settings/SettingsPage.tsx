import { Box, Button } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { QuizSettings } from "../../api/quiz/types";
import { getLoggedUser, updateUser } from "../../api/user/api";
import { User } from "../../api/user/types";
import { INITIAL_LESSON_CONFIG } from "../../components/lessonConfig/components/constants";
import LessonConfig from "../../components/lessonConfig/LessonConfig";

const SettingsPage: FunctionComponent = () => {
  const [defaultSettings, setDefaultSettings] = useState<QuizSettings>(
    INITIAL_LESSON_CONFIG
  );
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getLoggedUser();
        setUser(data);
        data?.defaultSettings && setDefaultSettings(data?.defaultSettings);
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const updateSettings = async () => {
      if (user) {
        try {
          await updateUser(user, { defaultSettings });
        } catch (error) {
          console.error("Error updating user: ", error);
        }
      } else {
        console.error("Error updating user: User does not exists");
      }
    };

    updateSettings();
  }, [defaultSettings]);

  return (
    <Box sx={{ width: "50%", margin: "auto" }}>
      <LessonConfig
        quizSettings={defaultSettings}
        setQuizSettings={setDefaultSettings}
      />
    </Box>
  );
};

export default SettingsPage;
