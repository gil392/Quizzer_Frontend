import { Box, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { INITIAL_QUIZ_SETTINGS } from "../../api/quiz/constants";
import { FeedbackType, QuestionsOrder } from "../../api/quiz/types";
import { getLoggedUser, updateUser } from "../../api/user/api";
import { User, UserSettings } from "../../api/user/types";
import LessonConfig from "../../components/lessonConfig/LessonConfig";
import DisplayModeSwitch from "../../components/settings/DisplayModeSwitch/DisplayModeSwitch";
import useStyles from "./styles";

const SettingsPage: FunctionComponent = () => {
  const classes = useStyles();
  const [user, setUser] = useState<User | null>(null);

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

  const setSettings = (userSettings: Partial<UserSettings>) => {
    userSettings?.feedbackType && setFeedbackType(userSettings.feedbackType);
    userSettings?.questionsOrder &&
      setQuestionsOrder(userSettings.questionsOrder);
    userSettings?.maxQuestionCount &&
      setMaxQuestionCount(userSettings.maxQuestionCount);
    userSettings?.isManualCount && setIsManualCount(userSettings.isManualCount);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getLoggedUser();
        setUser(data);
        data?.settings && setSettings(data.settings);
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
          const settings: Partial<UserSettings> = {
            feedbackType,
            questionsOrder,
            maxQuestionCount,
            isManualCount,
          };
          await updateUser({ settings });
        } catch (error) {
          console.error("Error updating user: ", error);
        }
      } else {
        console.error("Error updating user: User does not exists");
      }
    };

    updateSettings();
  }, [feedbackType, questionsOrder, maxQuestionCount, isManualCount]);

  return (
    <Box className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Display Mode
      </Typography>
      <DisplayModeSwitch />
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
    </Box>
  );
};

export default SettingsPage;
