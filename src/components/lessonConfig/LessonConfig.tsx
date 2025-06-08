import { FunctionComponent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  FeedbackType,
  QuestionsOrder,
  QuizSettings,
} from "../../api/quiz/types";
import { RootState } from "../../store/store";
import {
  FEEDBACK_OPTIONS,
  QUESTIONS_ORDER_OPTIONS,
} from "./components/constants";
import GeneralSelectOption from "./components/GeneralSelectOption";
import MaxQuestionCount from "./components/MaxQuestionCount";
import { Option } from "./components/types";
import { getDefaultQuizSettings } from "./components/utils";

interface LessonConfigProps {
  onChange: (quizSettings: QuizSettings) => void;
}

const LessonConfig: FunctionComponent<LessonConfigProps> = ({ onChange }) => {
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);

  const defaultQuizSettings = getDefaultQuizSettings(loggedUser?.settings);

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
      solvingTimeMs: defaultQuizSettings.solvingTimeMs,
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
