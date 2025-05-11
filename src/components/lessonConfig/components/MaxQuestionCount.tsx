import { Box, Slider, Typography } from "@mui/material";
import { FunctionComponent } from "react";
import {
  MANUAL_MAX_QUESTIONS_COUNT,
  MANUAL_MIN_QUESTIONS_COUNT,
  MANUAL_QUESTIONS_COUNT_OPTION,
  MANUAL_QUESTIONS_COUNT_STEP,
  QUESTION_COUNT_OPTIONS,
} from "./constants";
import GeneralSelectOption from "./GeneralSelectOption";
import useStyles from "./styles";
import { Option } from "./types";

interface MaxQuestionCountProps {
  maxQuestionCount: number;
  setMaxQuestionCount: (maxQuestionCount: number) => void;
  isManualCount: boolean;
  setIsManualCount: (isManualCount: boolean) => void;
}

const MaxQuestionCount: FunctionComponent<MaxQuestionCountProps> = (props) => {
  const classes = useStyles();
  const updateChanges = (maxQuestionCount: number, isManualCount: boolean) => {
    props.setMaxQuestionCount(maxQuestionCount);
    props.setIsManualCount(isManualCount);
  };

  const setSelectedCount = (maxCount: string) => {
    const numMaxCount = Number(maxCount);
    switch (numMaxCount) {
      case MANUAL_QUESTIONS_COUNT_OPTION:
        updateChanges(MANUAL_MIN_QUESTIONS_COUNT, true);
        break;
      default:
        updateChanges(numMaxCount, false);
    }
  };

  const setManualCount = (maxCount: number) => {
    updateChanges(maxCount, true);
  };

  const isOptionSelected = (option: Option) =>
    props.isManualCount
      ? option.value === MANUAL_QUESTIONS_COUNT_OPTION
      : option.value === props.maxQuestionCount;

  return (
    <>
      <GeneralSelectOption
        title={"How Many Questions?"}
        options={QUESTION_COUNT_OPTIONS}
        isOptionSelected={isOptionSelected}
        setSelectedOption={setSelectedCount}
      />
      {props.isManualCount && (
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="body2" gutterBottom>
            Select the number of questions (5-30):
          </Typography>
          <Slider
            className={classes.manualSelection}
            value={props.maxQuestionCount}
            onChange={(_, value) => setManualCount(value)}
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
