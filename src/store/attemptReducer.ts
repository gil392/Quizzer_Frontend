import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getQuizAttempts, createQuizAttempt, rateQuiz } from "../api/quiz/api";
import { QuizAttempt, QuizAnswerSubmittion } from "../api/quiz/types";
import { deleteQuizAsync } from "./quizReducer";

export const fetchQuizAttempts = createAsyncThunk(
  "attempt/fetchQuizAttempts",
  async (quizId: string) => {
    const response = await getQuizAttempts(quizId);
    return { quizId, attempts: response.data };
  }
);

export const createQuizAttemptAsync = createAsyncThunk(
  "attempt/createQuizAttempt",
  async (data: QuizAnswerSubmittion) => {
    const response = await createQuizAttempt(data);
    return response.data;
  }
);

export const rateQuizAttemptAsync = createAsyncThunk(
  "attempt/rateQuizAttempt",
  async ({ quizId, rating }: { quizId: string; rating: number | null }) => {
    const response = await rateQuiz(quizId, rating);
    return { quizId, ...response.data };
  }
);

interface AttemptsState {
  attemptsByQuiz: Record<string, QuizAttempt[] | undefined>;
}

const initialState: AttemptsState = {
  attemptsByQuiz: {},
};

const attemptSlice = createSlice({
  name: "attempt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizAttempts.fulfilled, (state, action) => {
        state.attemptsByQuiz[action.payload.quizId] = action.payload.attempts;
      })
      .addCase(createQuizAttemptAsync.fulfilled, (state, action) => {
        const quizId = action.payload.quizId;
        if (!state.attemptsByQuiz[quizId]) {
          state.attemptsByQuiz[quizId] = [];
        }
        state.attemptsByQuiz[quizId].push(action.payload);
      })
      .addCase(deleteQuizAsync.fulfilled, (state, action) => {
        delete state.attemptsByQuiz[action.payload];
      });
  },
});

export default attemptSlice.reducer;
