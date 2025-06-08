import { AxiosPromise } from "axios";
import apiClient from "../client";
import { Notification } from "./types";

export const getNotifications = (): AxiosPromise<Notification[]> =>
    apiClient.get("/notifications");

export const markNotificationAsRead = (id: string): AxiosPromise<Notification> =>
    apiClient.put(`/notifications/${id}/read`);

export const deleteNotification = (id: string): AxiosPromise<void> =>
    apiClient.delete(`/notifications/${id}`);

export const notifyFriendsAboutAchievement = (payload: {
    relatedEntityId: string;
    entityType: "quiz" | "summary" | "user";
    score?: number;
}): AxiosPromise<void> =>
    apiClient.post("/notifications/share-achievement", payload);

export const shareQuizOrSummary = (payload: {
    toUserIds: string[];
    entityType: "quiz" | "summary";
    relatedEntityId: string;
}): AxiosPromise<void> =>
    apiClient.post("/notifications/share", payload);