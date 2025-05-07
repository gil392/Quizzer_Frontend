export type QuizSettings = {
  checkType: "onSubmit" | "onSelectAnswer";
  isRandomOrder: boolean;
  maxQuestionCount: number;
  solvingTimeMs: number;
};

export type LessonData = {
  _id: string;
  title: string;
  summary: string;
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
  ratings: number[];
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
