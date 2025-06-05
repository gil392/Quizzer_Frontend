import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { QuizSettings } from "../../api/quiz/types";
import LessonConfig from "../../components/lessonConfig/LessonConfig";
import DisplayModeSwitch from "../../components/settings/DisplayModeSwitch/DisplayModeSwitch";
import { AppDispatch, RootState } from "../../store/store";
import { updateUserAsync } from "../../store/userReducer";
import useStyles from "./styles";
import { getDefaultQuizSettings } from "../../components/lessonConfig/components/utils";

const SettingsPage: FunctionComponent = () => {
  const classes = useStyles();
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);
  const dispatch = useDispatch<AppDispatch>();

  const defaultQuizSettings = getDefaultQuizSettings(loggedUser?.settings);

  const updateSettings = async (quizSettings: QuizSettings) => {
    try {
      await dispatch(updateUserAsync({ settings: quizSettings }));
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  return (
    <Box className={classes.root}>
      <Typography variant="h6" gutterBottom>
        Display Mode
      </Typography>
      <DisplayModeSwitch />
      <LessonConfig
        defaultQuizSettings={defaultQuizSettings}
        onChange={updateSettings}
      />
    </Box>
  );
};

export default SettingsPage;
