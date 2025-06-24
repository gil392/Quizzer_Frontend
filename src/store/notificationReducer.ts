import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    deleteNotification,
    getNotifications,
    markNotificationAsRead,
    notifyFriendsAboutAchievement,
    shareLesson
} from "../api/notification/api";
import { Notification } from "../api/notification/types";

export const fetchNotifications = createAsyncThunk(
    "notification/getNotifications",
    async () => {
        const response = await getNotifications();
        return response.data;
    }
);

export const shareLessonAsync = createAsyncThunk(
    "notification/shareLesson",
    async ({ toUserIds, relatedEntityId }: {
        toUserIds: string[];
        relatedEntityId: string;
    }) => {
        const response = await shareLesson(toUserIds, relatedEntityId);
        return response.data;
    }
);

export const notifyFriendsAboutAchievementAsync = createAsyncThunk(
    "notification//shareAchievement",
    async () => {
        const response = await notifyFriendsAboutAchievement();
        return response.data;
    }
);

export const markNotificationAsReadAsync = createAsyncThunk(
    "notification/markAsRead",
    async (id: string) => {
        markNotificationAsRead(id);
        return id;
    }
);

export const deleteNotificationAsync = createAsyncThunk(
    "notification/deleteNotification",
    async (id: string) => {
        deleteNotification(id);
        return id;
    }
);

interface NotificationState {
    notifications: Notification[];
    fetchStatus: "loading" | "succeeded" | "failed";

}

const initialState: NotificationState = {
    notifications: [],
    fetchStatus: "loading",
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.rejected, (state) => {
                state.fetchStatus = "failed";
            })
            .addCase(fetchNotifications.pending, (state) => {
                state.fetchStatus = "loading";
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.fetchStatus = "succeeded";
                state.notifications = action.payload;
            })
            .addCase(shareLessonAsync.fulfilled, () => { })
            .addCase(markNotificationAsReadAsync.fulfilled, (state, action) => {
                const notification = state.notifications.find((notification) => notification._id === action.payload);
                if (notification) {
                    notification.read = true;
                }
            })
            .addCase(deleteNotificationAsync.fulfilled, (state, action) => {
                state.notifications = state.notifications.filter((notification) => notification._id !== action.payload);
            })
            .addCase(notifyFriendsAboutAchievementAsync.fulfilled, () => { });
    },
});

export default notificationSlice.reducer;
