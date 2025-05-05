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
import { QuizSettings } from "../../../api/quiz/types";

interface MaxQuestionCountProps {
  maxQuestionCount: QuizSettings["maxQuestionCount"];
  isManualCount: QuizSettings["isManualCount"];
  onQuizSettingsChange: (
    settingName: keyof QuizSettings,
    settingValue: any
  ) => void;
}

const MaxQuestionCount: FunctionComponent<MaxQuestionCountProps> = ({
  maxQuestionCount,
  isManualCount,
  onQuizSettingsChange,
}) => {
  const setMaxQuestionCount = (
    maxQuestionCount: Number,
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

  const onManualCountChange = (maxCount: Number) => {
    setMaxQuestionCount(maxCount, true);
  };

  const isCountOptionSelected = (option: Option) =>
    !isManualCount && maxQuestionCount === option.value;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        How Many Questions?
      </Typography>
      {/* <Box className="custom-radio-group">
        {QUESTION_COUNT_OPTIONS.map((option) => (
          <label
            key={option.value}
            className={`custom-radio ${
              isCountOptionSelected(option.value) ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="questionCount"
              value={option.value}
              checked={maxQuestionCount === option.value}
              onChange={({ target }) =>
                onSelectedCountChange(Number(target.value))
              }
            />
            <span>{option.label}</span>
          </label>
        ))}
      </Box> */}
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
            value={maxQuestionCount as number}
            onChange={(_, value) => onManualCountChange(value as number)}
            step={MANUAL_QUESTIONS_COUNT_STEP}
            marks
            min={MANUAL_MIN_QUESTIONS_COUNT}
            max={MANUAL_MAX_QUESTIONS_COUNT}
            valueLabelDisplay="auto"
            sx={{
              color: "primary.main",
              height: 8,
              "& .MuiSlider-thumb": {
                height: 16,
                width: 16,
                backgroundColor: "#fff",
                border: "2px solid currentColor",
                "&:hover": {
                  boxShadow: "0px 0px 0px 8px rgba(25, 118, 210, 0.16)",
                },
                "&.Mui-active": {
                  boxShadow: "0px 0px 0px 14px rgba(25, 118, 210, 0.16)",
                },
              },
              "& .MuiSlider-rail": {
                backgroundColor: "#bdbdbd",
              },
              "& .MuiSlider-mark": {
                backgroundColor: "#bdbdbd",
                height: 8,
                width: 8,
                borderRadius: "50%",
              },
              "& .MuiSlider-markActive": {
                backgroundColor: "primary.main",
              },
            }}
          />
        </Box>
      )}
    </>
  );
};

export default MaxQuestionCount;
