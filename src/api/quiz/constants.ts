import { LOW_QUESTIONS_COUNT } from "../../components/lessonConfig/components/constants";
import { QuizSettings } from "./types";

export const INITIAL_QUIZ_SETTINGS: QuizSettings = {
  feedbackType: "onSubmit",
  questionsOrder: "chronological",
  maxQuestionCount: LOW_QUESTIONS_COUNT,
  isManualCount: false,
  solvingTimeMs: 60000,
};
