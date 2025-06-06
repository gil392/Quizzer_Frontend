export type FeedbackType = "onSubmit" | "onSelectAnswer";
export type QuestionsOrder = "chronological" | "random";

export type QuizSettings = {
  feedbackType: FeedbackType;
  isRandomOrder: boolean;
  maxQuestionCount: number;
  solvingTimeMs: number;
  questionsOrder: QuestionsOrder;
  isManualCount: boolean;
};

export type QuizData = {
  _id: string;
  title: string;
  lessonId: string;
  questions: {
    _id: string;
    text: string;
    answers: string[];
  }[];
  settings: QuizSettings;
  rating: number | null;
};

export type QuizAnswerSubmittion = {
  quizId: string;
  questions: QuestionAnswerSubmittion[];
};

export type QuizAnswer = {
  attemptId: string;
  questionId: string;
  selectedAnswer: string;
};

export type QuestionAnswerSubmittion = {
  questionId: string;
  selectedAnswer: string;
};

export type QuizResult = {
  quizId: string;
  results: QuestionResults[];
  score: number;
};

export type QuestionResults = {
  questionId: string;
  selectedAnswer: string | null;
  correctAnswer: string | null;
  isCorrect: boolean | null;
};

export type QuizAttempt = {
  _id: string;
  expiryTime: number;
} & QuizResult;
