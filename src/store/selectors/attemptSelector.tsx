import { RootState } from "../store";

export const selectAttemptSelector = (
  state: RootState,
  quizId?: string,
  attemptId?: string
) => {
  if (!quizId || !attemptId) return null;
  const attempts = state.attempt.attemptsByQuiz[quizId];
  if (!attempts) return null;
  return attempts.find((attempt) => attempt._id === attemptId) ?? null;
};
