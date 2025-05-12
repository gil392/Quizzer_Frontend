import { FunctionComponent } from "react";
import { FeedbackType, QuestionsOrder } from "../../api/quiz/types";
import {
  FEEDBACK_OPTIONS,
  QUESTIONS_ORDER_OPTIONS,
} from "./components/constants";
import GeneralSelectOption from "./components/GeneralSelectOption";
import { Option } from "./components/types";
import MaxQuestionCount from "./components/MaxQuestionCount";

interface LessonConfigProps {
  feedbackType: FeedbackType;
  setFeedbackType: (feedbackType: FeedbackType) => void;
  questionsOrder: QuestionsOrder;
  setQuestionsOrder: (questionsOrder: QuestionsOrder) => void;
  maxQuestionCount: number;
  setMaxQuestionCount: (maxQuestionCount: number) => void;
  isManualCount: boolean;
  setIsManualCount: (isManualCount: boolean) => void;
}

const LessonConfig: FunctionComponent<LessonConfigProps> = (props) => {
  return (
    <>
      <MaxQuestionCount
        maxQuestionCount={props.maxQuestionCount}
        setMaxQuestionCount={props.setMaxQuestionCount}
        isManualCount={props.isManualCount}
        setIsManualCount={props.setIsManualCount}
      />

      <GeneralSelectOption
        title={"Questions Order"}
        options={QUESTIONS_ORDER_OPTIONS}
        isOptionSelected={(option: Option) =>
          option.value === props.questionsOrder
        }
        setSelectedOption={(selectedOption: string) => {
          props.setQuestionsOrder(selectedOption as QuestionsOrder);
        }}
      />

      <GeneralSelectOption
        title={"Feedback"}
        options={FEEDBACK_OPTIONS}
        isOptionSelected={(option: Option) =>
          option.value === props.feedbackType
        }
        setSelectedOption={(selectedOption: string) => {
          props.setFeedbackType(selectedOption.toString() as FeedbackType);
        }}
      />
    </>
  );
};

export default LessonConfig;
