import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LessonData } from "../api/lesson/types";
import {
  getLessons,
  updateLesson,
  deleteLesson,
  mergeLessons,
  generateLesson,
} from "../api/lesson/api";
import { RootState } from "./store";

export const fetchLessons = createAsyncThunk(
  "lesson/fetchLessons",
  async () => {
    const response = await getLessons();
    return response.data;
  }
);

export const createLessonAsync = createAsyncThunk(
  "lesson/createLesson",
  async ({
    videoUrl,
    relatedLessonGroupId,
  }: {
    videoUrl: string;
    relatedLessonGroupId?: string;
  }) => {
    const response = await generateLesson(
      videoUrl,
      relatedLessonGroupId ?? null
    );
    return response.data;
  }
);

export const updateLessonAsync = createAsyncThunk(
  "lesson/updateLesson",
  async (lesson: LessonData) => {
    const response = await updateLesson(lesson._id, lesson);
    return response.data;
  }
);

export const deleteLessonAsync = createAsyncThunk(
  "lesson/deleteLesson",
  async (lessonId: string, {getState}) => {
    await deleteLesson(lessonId);
    const state = getState() as RootState;
    const quizIds = Object.values(state.quizzes.quizzes)
      .filter((quiz) => quiz.lessonId === lessonId)
      .map((quiz) => quiz._id);
    return {lessonId, quizIds};
  }
);

export const mergeLessonsAsync = createAsyncThunk(
  "lesson/mergeLessons",
  async ({ lessonIds, title }: { lessonIds: string[]; title?: string }) => {
    const response = await mergeLessons(lessonIds, title);
    return response.data;
  }
);

interface LessonState {
  lessons: LessonData[];
}

const initialState: LessonState = {
  lessons: [],
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.lessons = action.payload;
      })
      .addCase(updateLessonAsync.fulfilled, (state, action) => {
        state.lessons = state.lessons.map((lesson) =>
          lesson._id === action.payload._id ? action.payload : lesson
        );
      })
      .addCase(deleteLessonAsync.fulfilled, (state, action) => {
        state.lessons = state.lessons.filter(
          (lesson) => lesson._id !== action.payload.lessonId
        );
      })
      .addCase(mergeLessonsAsync.fulfilled, (state, action) => {
        state.lessons.push(action.payload);
      })
      .addCase(createLessonAsync.fulfilled, (state, action) => {
        state.lessons.push(action.payload);
      });
  },
});

export default lessonSlice.reducer;
