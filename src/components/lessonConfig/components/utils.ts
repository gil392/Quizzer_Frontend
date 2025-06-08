import { INITIAL_QUIZ_SETTINGS } from "../../../api/quiz/constants";
import { QuizSettings } from "../../../api/quiz/types";
import { UserSettings } from "../../../api/user/types";

export const getDefaultQuizSettings = (
  dafualtSettings: Partial<QuizSettings | UserSettings> | undefined
): QuizSettings => ({
  feedbackType:
    dafualtSettings?.feedbackType ?? INITIAL_QUIZ_SETTINGS.feedbackType,
  maxQuestionCount:
    dafualtSettings?.maxQuestionCount ?? INITIAL_QUIZ_SETTINGS.maxQuestionCount,
  solvingTimeMs:
    dafualtSettings?.solvingTimeMs ?? INITIAL_QUIZ_SETTINGS.solvingTimeMs,
  questionsOrder:
    dafualtSettings?.questionsOrder ?? INITIAL_QUIZ_SETTINGS.questionsOrder,
  isManualCount:
    dafualtSettings?.isManualCount ?? INITIAL_QUIZ_SETTINGS.isManualCount,
});
