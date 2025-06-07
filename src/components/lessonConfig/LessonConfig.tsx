import { FunctionComponent, useEffect, useState } from "react";
import {
  FeedbackType,
  QuestionsOrder,
  QuizSettings,
} from "../../api/quiz/types";
import {
  FEEDBACK_OPTIONS,
  QUESTIONS_ORDER_OPTIONS,
} from "./components/constants";
import GeneralSelectOption from "./components/GeneralSelectOption";
import { Option } from "./components/types";
import MaxQuestionCount from "./components/MaxQuestionCount";
import { INITIAL_QUIZ_SETTINGS } from "../../api/quiz/constants";

interface LessonConfigProps {
  defaultQuizSettings: QuizSettings;
  onChange: (quizSettings: QuizSettings) => void;
}

const LessonConfig: FunctionComponent<LessonConfigProps> = ({
  defaultQuizSettings,
  onChange,
}) => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>(
    defaultQuizSettings.feedbackType
  );

  const [questionsOrder, setQuestionsOrder] = useState<QuestionsOrder>(
    defaultQuizSettings.questionsOrder
  );

  const [maxQuestionCount, setMaxQuestionCount] = useState<number>(
    defaultQuizSettings.maxQuestionCount
  );

  const [isManualCount, setIsManualCount] = useState<boolean>(
    defaultQuizSettings.isManualCount
  );

  useEffect(() => {
    onChange({
      feedbackType,
      questionsOrder,
      maxQuestionCount,
      isManualCount,
      solvingTimeMs:
        defaultQuizSettings?.solvingTimeMs ??
        INITIAL_QUIZ_SETTINGS.solvingTimeMs,
    });
  }, [feedbackType, questionsOrder, maxQuestionCount, isManualCount]);

  return (
    <>
      <MaxQuestionCount
        maxQuestionCount={maxQuestionCount}
        setMaxQuestionCount={setMaxQuestionCount}
        isManualCount={isManualCount}
        setIsManualCount={setIsManualCount}
      />

      <GeneralSelectOption
        title={"Questions Order"}
        options={QUESTIONS_ORDER_OPTIONS}
        isOptionSelected={(option: Option) => option.value === questionsOrder}
        setSelectedOption={(selectedOption: string) => {
          setQuestionsOrder(selectedOption as QuestionsOrder);
        }}
      />

      <GeneralSelectOption
        title={"Feedback"}
        options={FEEDBACK_OPTIONS}
        isOptionSelected={(option: Option) => option.value === feedbackType}
        setSelectedOption={(selectedOption: string) => {
          setFeedbackType(selectedOption.toString() as FeedbackType);
        }}
      />
    </>
  );
};

export default LessonConfig;
