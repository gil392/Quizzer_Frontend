import { Box, Button } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { INITIAL_LESSON_CONFIG } from "../../components/lessonConfig/components/constants";
import LessonConfig from "../../components/lessonConfig/LessonConfig";
import { QuizSettings } from "../../api/quiz/types";
import { getLoggedUser, updateUser } from "../../api/user/api";
import { useUserId } from "../../components/user/globalProvider";
import { User } from "../../api/user/types";

const SettingsPage: FunctionComponent = () => {
  const [defaultSettings, setDefaultSettings] = useState<QuizSettings>(
    INITIAL_LESSON_CONFIG
  );
  const [user, setUser] = useState<User | null>(null);

  const { userId } = useUserId();

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
  }, [userId]);

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

  return (
    <Box sx={{ width: "50%", margin: "auto" }}>
      <LessonConfig
        quizSettings={defaultSettings}
        setQuizSettings={setDefaultSettings}
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
        onClick={updateSettings}
      >
        Submit Changes
      </Button>
    </Box>
  );
};

export default SettingsPage;
