import { FeedbackType, QuestionsOrder } from "../../../api/quiz/types";

export interface Option {
  value: number | string;
  label: string;
}

export interface QuestionCountOption {
  value: number;
  label: string;
}

export interface QuestionsOrderOption {
  value: QuestionsOrder;
  label: string;
}

export interface FeedbackOption {
  value: FeedbackType;
  label: string;
}
