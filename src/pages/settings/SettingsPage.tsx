import { FunctionComponent, SetStateAction, useState } from "react";
import { QuizSettings } from "../../services/backend/types";
import { INITIAL_LESSON_CONFIG } from "../../components/lessonConfig/components/constants";
import LessonConfig from "../../components/lessonConfig/LessonConfig";

const SettingsPage: FunctionComponent = () => {
  const [quizSettings, setQuizSettings] = useState<QuizSettings>(
    INITIAL_LESSON_CONFIG
  );
  return (
    <>
      <LessonConfig
        quizSettings={quizSettings}
        setQuizSettings={setQuizSettings}
      />
    </>
  );
};

export default SettingsPage;
