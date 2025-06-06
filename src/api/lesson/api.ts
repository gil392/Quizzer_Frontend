import { AxiosPromise } from 'axios';
import apiClient from '../client';
import { deleteItem, updateItem } from '../utils';
import { LessonData, RelatedVideo } from './types';

export const generateLesson = (videoUrl: string, relatedLessonGroupId: string | null): AxiosPromise<LessonData> =>
  apiClient.post("/lesson", { videoUrl, relatedLessonGroupId });

export const getLessons = (): AxiosPromise<LessonData[]> =>
  apiClient.get("/lesson");

export const updateLesson = (
  lessonId: string,
  updatedData: Partial<LessonData>
): AxiosPromise<LessonData> => updateItem(lessonId, updatedData, "lesson");

export const deleteLesson = (lessonId: string) =>
  deleteItem(lessonId, 'lesson');

export const getRelatedLessons = (lessonId: string): AxiosPromise<RelatedVideo[]> =>
  apiClient.get(`/lesson/relatedVideos`, { params: { id: lessonId } });

export const mergeLessons = (lessonIds: string[], title?: string) => {
  return apiClient.post("/lesson/merge", { lessonIds, title });
};

export const getLessonSuccessRate = (lessonId: string): AxiosPromise<{ successRate: number }> =>
  apiClient.get(`/lesson/${lessonId}/successRate`);