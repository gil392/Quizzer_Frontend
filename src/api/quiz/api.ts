import { AxiosPromise } from "axios";
import apiClient from "../client";
import { LessonData } from "../lesson/types";
import { deleteItem, updateItem } from "../utils";
import {
  QuestionResults,
  QuizAnswer,
  QuizAnswerSubmittion,
  QuizAnswerUpdateSubmittion,
  QuizAttempt,
  QuizData,
  QuizSettings,
} from "./types";

export const getLessonById = (lessonId: string): AxiosPromise<LessonData> =>
  apiClient.get(`/lesson/${lessonId}`);

export const getQuizzes = (lessonId: string): AxiosPromise<QuizData[]> =>
  apiClient.get("/quiz", { params: { lessonId } });

export const getQuizById = (id: string): AxiosPromise<QuizData> =>
  apiClient.get(`/quiz/${id}`);

export const generateQuiz = (
  lessonId: string,
  settings?: QuizSettings
): AxiosPromise<QuizData> => apiClient.post("/quiz", { lessonId, settings });

export const updateQuiz = (
  quizId: string,
  updatedData: Partial<QuizData>
): AxiosPromise<QuizData> => updateItem(quizId, updatedData, "quiz");

export const deleteQuiz = (quizId: string) => deleteItem(quizId, "quiz");

export const getQuizAttempts = (quizId: string): AxiosPromise<QuizAttempt[]> =>
  apiClient.get("/attempt", { params: { quizId } });

export const createQuizAttempt = (
  data: QuizAnswerSubmittion
): AxiosPromise<QuizAttempt> => apiClient.post("/attempt", data);

export const updateAttemptWithAnswers = (
  data: QuizAnswerUpdateSubmittion
): AxiosPromise<QuizAttempt> => apiClient.put("/attempt/update", data);

export const addAnswerToQuizAttempt = (
  data: QuizAnswer
): AxiosPromise<QuizAttempt> => apiClient.post("/attempt/answer", data);

export const rateQuiz = (
  quizId: string,
  rating: number | null
): AxiosPromise<{ message: string; rating: number | null }> =>
  apiClient.post(
    "/quiz/rate",
    { rating },
    {
      params: { quizId },
    }
  );

export const submitQuestionAnswer = (
  questionId: string,
  selectedAnswer: string
): AxiosPromise<QuestionResults> =>
  apiClient.get(`/attempt/question/${questionId}`, {
    params: { selectedAnswer },
  });
