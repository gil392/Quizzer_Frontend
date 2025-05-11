import { QuizSettings } from "../../../api/quiz/types";
import { FeedbackOption, Option, QuestionsOrderOption } from "./types";

export const LOW_QUESTIONS_COUNT = 5;
export const MEDIUM_QUESTIONS_COUNT = 10;
export const HIGH_QUESTIONS_COUNT = 20;
export const MANUAL_QUESTIONS_COUNT_OPTION = -1;
export const MANUAL_MIN_QUESTIONS_COUNT = 5;
export const MANUAL_MAX_QUESTIONS_COUNT = 30;
export const MANUAL_QUESTIONS_COUNT_STEP = 5;

export const QUESTION_COUNT_OPTIONS: Option[] = [
  { value: LOW_QUESTIONS_COUNT, label: "Low (5)" },
  { value: MEDIUM_QUESTIONS_COUNT, label: "Medium (10)" },
  { value: HIGH_QUESTIONS_COUNT, label: "High (20)" },
  { value: MANUAL_QUESTIONS_COUNT_OPTION, label: "Manual" },
];

export const QUESTIONS_ORDER_OPTIONS: QuestionsOrderOption[] = [
  { value: "chronological", label: "Chronological" },
  { value: "random", label: "Random" },
];

export const FEEDBACK_OPTIONS: FeedbackOption[] = [
  { value: "onSubmit", label: "On Submit" },
  { value: "onSelectAnswer", label: "Every Question" },
];
