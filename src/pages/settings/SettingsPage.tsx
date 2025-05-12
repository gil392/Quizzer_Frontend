import { Box } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { INITIAL_QUIZ_SETTINGS } from "../../api/quiz/constants";
import {
  DisplayMode,
  FeedbackType,
  QuestionsOrder,
  QuizSettings,
} from "../../api/quiz/types";
import { getLoggedUser, updateUser } from "../../api/user/api";
import { User } from "../../api/user/types";
import DisplayModeSwtich from "../../components/settings/DisplayModeSwitch/DisplayModeSwitch";
import LessonConfig from "../../components/lessonConfig/LessonConfig";
import { useDisplayMode } from "../../components/settings/DisplayModeSwitch/globalProvider";

const SettingsPage: FunctionComponent = () => {
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

  const [displayMode, setDisplayMode] = useState<DisplayMode>(
    INITIAL_QUIZ_SETTINGS.displayMode
  );

  const setSettings = (quizSettings: QuizSettings) => {
    setFeedbackType(quizSettings.feedbackType);
    setQuestionsOrder(quizSettings.questionsOrder);
    setMaxQuestionCount(quizSettings.maxQuestionCount);
    setIsManualCount(quizSettings.isManualCount);
    setDisplayMode(quizSettings.displayMode);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getLoggedUser();
        setUser(data);
        data?.settings && setSettings(data?.settings);
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
          const settings: QuizSettings = {
            feedbackType,
            questionsOrder,
            maxQuestionCount,
            isManualCount,
            displayMode: displayMode,
            solvingTimeMs: INITIAL_QUIZ_SETTINGS.solvingTimeMs,
            isRandomOrder: INITIAL_QUIZ_SETTINGS.isRandomOrder,
          };
          await updateUser(user, { settings });
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
    <Box sx={{ width: "50%", margin: "auto" }}>
      <DisplayModeSwtich
        displayMode={displayMode}
        setDisplayMode={setDisplayMode}
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
    </Box>
  );
};

export default SettingsPage;
