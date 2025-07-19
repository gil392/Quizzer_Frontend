import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    deleteNotification,
    getNotifications,
    markNotificationAsRead,
    shareAchievement,
    shareLesson,
    notifyFriendRequest,
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

export const shareAchievementAsync = createAsyncThunk(
    "notification/shareAchievement",
    async ({ toUserIds, relatedEntityId }: {
        toUserIds: string[];
        relatedEntityId: string;
    }) => {
        const response = await shareAchievement(toUserIds, relatedEntityId);
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

export const notifyFriendRequestAsync = createAsyncThunk(
    "notification/notifyFriendRequest",
    async (toUserId: string) => {
        const response = await notifyFriendRequest(toUserId);
        return response.data;
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
            .addCase(markNotificationAsReadAsync.fulfilled, (state, action) => {
                const notification = state.notifications.find((notification) => notification._id === action.payload);
                if (notification) {
                    notification.read = true;
                }
            })
            .addCase(deleteNotificationAsync.fulfilled, (state, action) => {
                state.notifications = state.notifications.filter((notification) => notification._id !== action.payload);
            })
            .addCase(shareAchievementAsync.fulfilled, () => { })
            .addCase(notifyFriendRequestAsync.fulfilled, () => { });
    },
});

export default notificationSlice.reducer;
