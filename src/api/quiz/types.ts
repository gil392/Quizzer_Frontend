export type QuizSettings = {
  feedbackType: "onSubmit" | "onSelectAnswer";
  questionsOrder: "chronological" | "random";
  displayMode: "Light" | "Dark";
  isRandomOrder: boolean;
  maxQuestionCount: number;
  isManualCount: boolean;
  solvingTimeMs: number;
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
