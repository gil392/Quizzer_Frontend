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
import { shareLessonAsync } from "./notificationReducer";
import { toastSuccess } from "../utils/utils";
import { addHandlerWithToast } from "./addHandlerWithToast";

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
  async (lessonId: string, { getState }) => {
    await deleteLesson(lessonId);
    const state = getState() as RootState;
    const quizIds = Object.values(state.quizzes.quizzes)
      .filter((quiz) => quiz.lessonId === lessonId)
      .map((quiz) => quiz._id);
    return { lessonId, quizIds };
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
  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: LessonState = {
  lessons: [],
  fetchStatus: "idle",
};

const lessonSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addHandlerWithToast(
      builder,
      deleteLessonAsync,
      (state, action) => {
        state.lessons = state.lessons.filter(
          (lesson) => lesson._id !== action.payload.lessonId
        );
      },
      "delete lesson"
    );
    addHandlerWithToast(
      builder,
      updateLessonAsync,
      (state, action) => {
        state.lessons = state.lessons.map((lesson) =>
          lesson._id === action.payload._id ? action.payload : lesson
        );
      },
      "update lesson"
    );
    addHandlerWithToast(
      builder,
      createLessonAsync,
      (state, action) => {
        state.lessons.push(action.payload);
      },
      "create lesson"
    );
    addHandlerWithToast(
      builder,
      mergeLessonsAsync,
      (state, action) => {
        state.lessons.push(action.payload);
      },
      "merge lessons"
    );
    builder
      .addCase(fetchLessons.rejected, (state) => {
        state.fetchStatus = "failed";
      })
      .addCase(fetchLessons.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.lessons = action.payload;
      })
      .addCase(shareLessonAsync.fulfilled, (state, action) => {
        const updatedLesson: LessonData = action.payload;
        state.lessons = state.lessons.map((lesson) =>
          lesson._id === updatedLesson._id
            ? { ...lesson, sharedUsers: updatedLesson.sharedUsers }
            : lesson
        );
        toastSuccess("Lesson shared successfully!");
      });
  },
});

export default lessonSlice.reducer;
