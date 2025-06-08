import apiClient from "../client";
import { Achievement } from "./types";

export const getAvailableAchievements = (abortController?: AbortController) =>
  apiClient.get<Achievement[]>("/achievement/progress", {
    signal: abortController?.signal,
  });


export const getAchievementImage = async (achievementId: string): Promise<Blob> => {
  const response = await apiClient.get(`/achievement/image/${achievementId}`, {
    responseType: "blob",
  });
  return response.data;
};