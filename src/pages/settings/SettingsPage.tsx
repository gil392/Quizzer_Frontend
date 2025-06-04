import { Box, Typography } from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import { INITIAL_QUIZ_SETTINGS } from "../../api/quiz/constants";
import { FeedbackType, QuestionsOrder } from "../../api/quiz/types";
import { UserSettings } from "../../api/user/types";
import LessonConfig from "../../components/lessonConfig/LessonConfig";
import DisplayModeSwitch from "../../components/settings/DisplayModeSwitch/DisplayModeSwitch";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { updateUserAsync } from "../../store/userReducer";

const SettingsPage: FunctionComponent = () => {
  const classes = useStyles();
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);
  const dispatch = useDispatch<AppDispatch>();

  const [feedbackType, setFeedbackType] = useState<FeedbackType>(
    loggedUser?.settings?.feedbackType ?? INITIAL_QUIZ_SETTINGS.feedbackType
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

  useEffect(() => {
    const updateSettings = async () => {
      if (loggedUser) {
        try {
          const settings: Partial<UserSettings> = {
            feedbackType,
            questionsOrder,
            maxQuestionCount,
            isManualCount,
          };
          await dispatch(updateUserAsync({ settings }));
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
