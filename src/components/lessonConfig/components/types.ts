import { QuizSettings } from "../../../api/quiz/types";

export interface Option {
  value: number | string;
  label: string;
}

export interface QuestionCountOption {
  value: number;
  label: string;
}

export interface QuestionsOrderOption {
  value: QuizSettings["questionsOrder"];
  label: string;
}

export interface FeedbackOption {
  value: QuizSettings["feedbackType"];
  label: string;
}
