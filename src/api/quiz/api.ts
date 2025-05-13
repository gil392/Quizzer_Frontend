import { AxiosPromise } from 'axios';
import apiClient from '../client';
import { deleteItem, updateItem } from '../utils';
import {
    QuizAnswerSubmittion,
    QuizAttempt,
    QuizData,
    QuizResult,
    QuizSettings
} from './types';

export const getQuizzes = (lessonId: string): AxiosPromise<QuizData[]> =>
    apiClient.get('/quiz', { params: {lessonId} });

export const getQuizById = (id: string): AxiosPromise<QuizData> =>
    apiClient.get(`/quiz/${id}`);

export const generateQuiz = (
    lessonId: string,
    settings?: QuizSettings
): AxiosPromise<QuizData> => apiClient.post('/quiz', { lessonId, settings });


export const updateQuiz = (
    quizId: string,
    updatedData: Partial<QuizData>
): AxiosPromise<QuizData> => updateItem(quizId, updatedData, 'quiz');

export const deleteQuiz = (quizId: string) => deleteItem(quizId, 'quiz');

export const getQuizAttempts = (quizId: string): AxiosPromise<QuizAttempt[]> =>
    apiClient.get(`/attempt/${quizId}`);

export const createQuizAttempt = (
    data: QuizAnswerSubmittion
): AxiosPromise<QuizResult> => apiClient.post('/attempt', data);
