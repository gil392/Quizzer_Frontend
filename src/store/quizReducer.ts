import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getQuizzes,
  deleteQuiz,
  generateQuiz,
  updateQuiz,
} from "../api/quiz/api";
import { QuizData, QuizSettings } from "../api/quiz/types";

export const fetchQuizzes = createAsyncThunk(
  "quiz/fetchQuizzes",
  async (lessonId: string) => {
    const response = await getQuizzes(lessonId);
    return response.data;
  }
);

export const deleteQuizAsync = createAsyncThunk(
  "quiz/deleteQuiz",
  async (quizId: string) => {
    await deleteQuiz(quizId);
    return quizId;
  }
);

export const generateQuizAsync = createAsyncThunk(
  "quiz/generateQuiz",
  async ({
    lessonId,
    settings,
  }: {
    lessonId: string;
    settings?: QuizSettings;
  }) => {
    const response = await generateQuiz(lessonId, settings);
    return response.data;
  }
);

export const updateQuizAsync = createAsyncThunk(
  "quiz/updateQuiz",
  async ({
    quizId,
    updatedData,
  }: {
    quizId: string;
    updatedData: Partial<QuizData>;
  }) => {
    const response = await updateQuiz(quizId, updatedData);
    return response.data;
  }
);

interface QuizState {
  quizzes: QuizData[];
}

const initialState: QuizState = {
  quizzes: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.quizzes = action.payload;
      })
      .addCase(deleteQuizAsync.fulfilled, (state, action) => {
        state.quizzes = state.quizzes.filter(
          (quiz) => quiz._id !== action.payload
        );
      })
      .addCase(generateQuizAsync.fulfilled, (state, action) => {
        state.quizzes.push(action.payload);
      })
      .addCase(updateQuizAsync.fulfilled, (state, action) => {
        state.quizzes = state.quizzes.map((quiz) =>
          quiz._id === action.payload._id ? action.payload : quiz
        );
      });
  },
});

export default quizSlice.reducer;
