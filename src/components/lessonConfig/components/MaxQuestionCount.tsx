import { FunctionComponent } from "react";
import { Box, Slider, Typography } from "@mui/material";
import {
  MANUAL_MAX_QUESTIONS_COUNT,
  MANUAL_MIN_QUESTIONS_COUNT,
  MANUAL_QUESTIONS_COUNT_OPTION,
  MANUAL_QUESTIONS_COUNT_STEP,
  QUESTION_COUNT_OPTIONS,
} from "./constants";
import GeneralSelectOption from "./GeneralSelectOption";
import { Option } from "./types";
import { QuizSettings, QuizSettingsField } from "../../../api/quiz/types";
import useStyles from "./styles";

interface MaxQuestionCountProps {
  maxQuestionCount: number;
  isManualCount: boolean;
  onQuizSettingsChange: (
    settingName: keyof QuizSettings,
    settingValue: QuizSettingsField
  ) => void;
}

const MaxQuestionCount: FunctionComponent<MaxQuestionCountProps> = ({
  maxQuestionCount,
  isManualCount,
  onQuizSettingsChange,
}) => {
  const classes = useStyles();
  const setMaxQuestionCount = (
    maxQuestionCount: number,
    isManualCount: boolean
  ) => {
    onQuizSettingsChange("maxQuestionCount", maxQuestionCount);
    onQuizSettingsChange("isManualCount", isManualCount);
  };

  const onSelectedCountChange = (maxCount: Option["value"]) => {
    const numMaxCount = Number(maxCount);
    switch (numMaxCount) {
      case MANUAL_QUESTIONS_COUNT_OPTION:
        setMaxQuestionCount(MANUAL_MIN_QUESTIONS_COUNT, true);
        break;
      default:
        setMaxQuestionCount(numMaxCount, false);
    }
  };

  const onManualCountChange = (maxCount: number) => {
    setMaxQuestionCount(maxCount, true);
  };

  const isCountOptionSelected = (option: Option) =>
    !isManualCount && maxQuestionCount === option.value;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        How Many Questions?
      </Typography>
      <GeneralSelectOption
        options={QUESTION_COUNT_OPTIONS}
        isOptionSelected={isCountOptionSelected}
        onOptionSelectChange={onSelectedCountChange}
      />
      {isManualCount && (
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="body2" gutterBottom>
            Select the number of questions (5-30):
          </Typography>
          <Slider
            className={classes.manualSelection}
            value={maxQuestionCount}
            onChange={(_, value) => onManualCountChange(value)}
            step={MANUAL_QUESTIONS_COUNT_STEP}
            marks
            min={MANUAL_MIN_QUESTIONS_COUNT}
            max={MANUAL_MAX_QUESTIONS_COUNT}
            valueLabelDisplay="auto"
          />
        </Box>
      )}
    </>
  );
};

export default MaxQuestionCount;
