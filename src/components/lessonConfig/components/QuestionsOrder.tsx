import { Typography } from "@mui/material";
import { FunctionComponent } from "react";
import { QuizSettings } from "../../../services/backend/types";
import { QUESTIONS_ORDER_OPTIONS } from "./constants";
import GeneralSelectOption from "./GeneralSelectOption";
import { Option } from "./types";

interface QuestionsOrderProps {
  questionsOrder: QuizSettings["questionsOrder"];
  onQuizSettingsChange: (
    settingName: keyof QuizSettings,
    settingValue: any
  ) => void;
}

const QuestionsOrder: FunctionComponent<QuestionsOrderProps> = ({
  questionsOrder,
  onQuizSettingsChange,
}) => {
  const isOptionSelected = (option: Option) => questionsOrder === option.value;

  const onSelectedCountChange = (selectedOption: Option["value"]) => {
    onQuizSettingsChange("questionsOrder", selectedOption);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Questions Order
      </Typography>
      <GeneralSelectOption
        options={QUESTIONS_ORDER_OPTIONS}
        isOptionSelected={isOptionSelected}
        onOptionSelectChange={onSelectedCountChange}
      />
    </>
  );
};

export default QuestionsOrder;
