import apiClient from "../client";
import { Achievement } from "./types";

export const getAvailableAchievements = (abortController?: AbortController) =>
  apiClient.get<Achievement[]>("/achievement/progress", {
    signal: abortController?.signal,
  });
