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
      {/* <Typography variant="h6" gutterBottom>
        Questions Order
      </Typography>
      <Box className="custom-radio-group">
        <label
          className={`custom-radio ${
            questionOrder === "chronological" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="questionOrder"
            value="chronological"
            checked={questionOrder === "chronological"}
            onChange={(e) =>
              setQuestionOrder(e.target.value as "chronological" | "random")
            }
          />
          <span>Chronological</span>
        </label>
        <label
          className={`custom-radio ${
            questionOrder === "random" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="questionOrder"
            value="random"
            checked={questionOrder === "random"}
            onChange={(e) =>
              setQuestionOrder(e.target.value as "chronological" | "random")
            }
          />
          <span>Random</span>
        </label>
      </Box>

      <Typography variant="h6" gutterBottom>
        Feedback
      </Typography>
      <Box className="custom-radio-group">
        <label
          className={`custom-radio ${
            feedbackType === "onSubmit" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="feedbackType"
            value="onSubmit"
            checked={feedbackType === "onSubmit"}
            onChange={(e) =>
              setFeedbackType(e.target.value as QuizSettings["checkType"])
            }
          />
          <span>On Submit</span>
        </label>
        <label
          className={`custom-radio ${
            feedbackType === "onSelectAnswer" ? "selected" : ""
          }`}
        >
          <input
            type="radio"
            name="feedbackType"
            value="onSelectAnswer"
            checked={feedbackType === "onSelectAnswer"}
            onChange={(e) =>
              setFeedbackType(e.target.value as QuizSettings["checkType"])
            }
          />
          <span>Every Question</span>
        </label>
      </Box> */}
    </>
  );
};

export default LessonConfig;
