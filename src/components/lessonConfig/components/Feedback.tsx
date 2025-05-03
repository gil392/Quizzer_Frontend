import { Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { QuizSettings } from "../../../services/backend/types";
import { QUESTIONS_ORDER_OPTIONS } from "./constants";
import GeneralSelectOption from "./GeneralSelectOption";
import { Option } from "./types";

interface FeedbackProps {
  feedbackType: QuizSettings["feedbackType"];
  onQuizSettingsChange: (
    settingName: keyof QuizSettings,
    settingValue: any
  ) => void;
}

const Feedback: FunctionComponent<FeedbackProps> = ({
  feedbackType,
  onQuizSettingsChange,
}) => {
  const isOptionSelected = (option: Option) => feedbackType === option.value;

  const onSelectedCountChange = (selectedOption: Option["value"]) => {
    onQuizSettingsChange("feedbackType", selectedOption);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Feedback
      </Typography>
      <GeneralSelectOption
        options={QUESTIONS_ORDER_OPTIONS}
        isOptionSelected={isOptionSelected}
        onOptionSelectChange={onSelectedCountChange}
      />
    </>
  );
};

export default Feedback;
