import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotifications } from "../api/notification/api";
import { Notification } from "../api/notification/types";

export const fetchNotifications = createAsyncThunk(
    "notification/getNotifications",
    async () => {
        const response = await getNotifications();
        return response.data;
    }
);

interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
    notifications: [],
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload;
            });
    },
});

export default notificationSlice.reducer;
