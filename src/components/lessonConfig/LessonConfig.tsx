import { FunctionComponent } from "react";
import MaxQuestionCount from "./components/MaxQuestionCount";
import QuestionsOrder from "./components/QuestionsOrder";
import Feedback from "./components/Feedback";
import { QuizSettings } from "../../api/quiz/types";

interface LessonConfigProps {
  quizSettings: QuizSettings;
  setQuizSettings: React.Dispatch<React.SetStateAction<QuizSettings>>;
}

const LessonConfig: FunctionComponent<LessonConfigProps> = ({
  quizSettings,
  setQuizSettings,
}) => {
  const onQuizSettingsChange = (
    settingName: keyof QuizSettings,
    settingValue: any
  ) => {
    setQuizSettings((prev) => ({
      ...prev,
      [settingName]: settingValue,
    }));
  };

  return (
    <>
      <MaxQuestionCount
        maxQuestionCount={quizSettings.maxQuestionCount}
        isManualCount={quizSettings.isManualCount}
        onQuizSettingsChange={onQuizSettingsChange}
      />

      <QuestionsOrder
        questionsOrder={quizSettings.questionsOrder}
        onQuizSettingsChange={onQuizSettingsChange}
      />

      <Feedback
        feedbackType={quizSettings.feedbackType}
        onQuizSettingsChange={onQuizSettingsChange}
      />
    </>
  );
};

export default LessonConfig;
