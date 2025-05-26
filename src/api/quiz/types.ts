export type FeedbackType = "onSubmit" | "onSelectAnswer";
export type QuestionsOrder = "chronological" | "random";

export type ApiQuizSettings = {
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
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

export type QuizAttempt = {
  _id: string;
} & QuizResult;
