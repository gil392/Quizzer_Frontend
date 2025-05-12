import { Box } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { INITIAL_QUIZ_SETTINGS } from "../../api/quiz/constants";
import {
  FeedbackType,
  QuestionsOrder,
  QuizSettings,
} from "../../api/quiz/types";
import { getLoggedUser, updateUser } from "../../api/user/api";
import { User } from "../../api/user/types";
import LessonConfig from "../../components/lessonConfig/LessonConfig";

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

  const setDefaultSettings = (quizSettings: QuizSettings) => {
    setFeedbackType(quizSettings.feedbackType);
    setQuestionsOrder(quizSettings.questionsOrder);
    setMaxQuestionCount(quizSettings.maxQuestionCount);
    setIsManualCount(quizSettings.isManualCount);
  };

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
          const defaultSettings: QuizSettings = {
            feedbackType,
            questionsOrder,
            maxQuestionCount,
            isManualCount,
            solvingTimeMs: INITIAL_QUIZ_SETTINGS.solvingTimeMs,
            isRandomOrder: INITIAL_QUIZ_SETTINGS.isRandomOrder,
            displayMode: INITIAL_QUIZ_SETTINGS.displayMode,
          };
          await updateUser(user, { defaultSettings });
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
