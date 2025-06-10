import apiClient from "../client";
import { Achievement } from "./types";

export const getAvailableAchievements = (userId?: string, abortController?: AbortController) =>
  apiClient.get<Achievement[]>(`/achievement/progress${userId ? `?friendId=${userId}` : ""}`, {
    signal: abortController?.signal,
  });

export const getAchievementImage = async (achievementId: string): Promise<Blob> => {
  const response = await apiClient.get(`/achievement/image/${achievementId}`, {
    responseType: "blob",
  });
  return response.data;
};