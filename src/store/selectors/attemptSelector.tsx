import { RootState } from "../store";

export const selectAttemptSelector = (
  state: RootState,
  quizId?: string,
  attemptId?: string
) => {
  if (!quizId || !attemptId) return undefined;
  const attempts = state.attempt.attemptsByQuiz[quizId];
  if (!attempts) return undefined;
  return attempts.find((attempt) => attempt._id === attemptId);
};
