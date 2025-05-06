import { Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { FEEDBACK_OPTIONS } from "./constants";
import GeneralSelectOption from "./GeneralSelectOption";
import { Option } from "./types";
import { QuizSettings } from "../../../api/quiz/types";

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
        options={FEEDBACK_OPTIONS}
        isOptionSelected={isOptionSelected}
        onOptionSelectChange={onSelectedCountChange}
      />
    </>
  );
};

export default Feedback;
