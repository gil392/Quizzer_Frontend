import { QuizAttempt, QuizData } from "../../api/quiz/types";

export const areAllQuestionsSubmitted = (
  quizData: QuizData,
  currentAttempt: QuizAttempt
) => {
  return (
    quizData.questions.length === currentAttempt.results.length &&
    currentAttempt.results.every((result) => result.correctAnswer !== null)
  );
};
