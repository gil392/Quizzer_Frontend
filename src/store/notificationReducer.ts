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
    },
});

export default notificationSlice.reducer;
