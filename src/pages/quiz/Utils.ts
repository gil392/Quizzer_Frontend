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

export const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };
