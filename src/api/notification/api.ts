import { AxiosPromise } from "axios";
import apiClient from "../client";
import { Notification } from "./types";

export const getNotifications = () =>
    apiClient.get("/notifications");

export const markNotificationAsRead = (id: string): AxiosPromise<Notification> => {
    return apiClient.put(`/notifications/${id}/read`);
}

export const deleteNotification = (id: string): AxiosPromise<void> => {
    return apiClient.delete(`/notifications/${id}`);
}

export const notifyFriendsAboutAchievement = (relatedEntityId: string) => {
    return apiClient.post("/notifications/share-achievement", relatedEntityId);
}

export const shareLesson = (
    toUserIds: string[],
    relatedEntityId: string
) => {
    return apiClient.post("/notifications/share-lesson", { toUserIds, relatedEntityId });
}

export const notifyFriendRequest = (toUserId: string) => {
    return apiClient.post("/notifications/friend-request", { toUserId });
};