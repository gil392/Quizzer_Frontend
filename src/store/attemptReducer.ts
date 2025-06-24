import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  getQuizAttempts,
  createQuizAttempt,
  rateQuiz,
  addAnswerToQuizAttempt,
  updateAttemptWithAnswers,
} from "../api/quiz/api";
import {
  QuizAttempt,
  QuizAnswerSubmittion,
  QuizAnswer,
  QuizAnswerUpdateSubmittion,
} from "../api/quiz/types";
import { deleteQuizAsync } from "./quizReducer";
import { deleteLessonAsync } from "./lessonReducer";
import { WritableDraft } from "immer";

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

export const updateAttemptWithAnswersAsync = createAsyncThunk(
  "attempt/updateAttemptWithAnswers",
  async (data: QuizAnswerUpdateSubmittion) => {
    const response = await updateAttemptWithAnswers(data);
    return response.data;
  }
);

export const addAnswerToQuizAttemptAsync = createAsyncThunk(
  "attempt/addAnswerToQuizAttempt",
  async (data: QuizAnswer) => {
    const response = await addAnswerToQuizAttempt(data);
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
      .addCase(addAnswerToQuizAttemptAsync.fulfilled, updateAttempt)
      .addCase(updateAttemptWithAnswersAsync.fulfilled, updateAttempt)
      .addCase(deleteQuizAsync.fulfilled, (state, action) => {
        delete state.attemptsByQuiz[action.payload];
      })
      .addCase(deleteLessonAsync.fulfilled, (state, action) => {
        const { quizIds } = action.payload;
        for (const id of quizIds) {
          delete state.attemptsByQuiz[id];
        }
      });
  },
});

export default attemptSlice.reducer;

function updateAttempt(
  state: WritableDraft<AttemptsState>,
  action: PayloadAction<QuizAttempt>
) {
  const quizId = action.payload.quizId;
  if (state.attemptsByQuiz[quizId]) {
    const attemptIndex = state.attemptsByQuiz[quizId].findIndex(
      (attempt) => attempt._id === action.payload._id
    );
    if (attemptIndex !== -1) {
      state.attemptsByQuiz[quizId][attemptIndex] = action.payload;
    }
  }
}
