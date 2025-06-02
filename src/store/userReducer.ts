import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFriends,
  getPendingFriends,
  getLoggedUser,
  acceptFriendRequest,
  declineFriendRequest,
  submitFriendRequest,
  searchUsers,
} from "../api/user/api";
import { User, UserWithId } from "../api/user/types";

export const fetchFriends = createAsyncThunk("user/fetchFriends", async () => {
  const response = await getFriends();
  return response.data;
});

export const fetchPendingFriends = createAsyncThunk(
  "user/fetchPendingFriends",
  async () => {
    const response = await getPendingFriends();
    return response.data;
  }
);

export const fetchLoggedUser = createAsyncThunk(
  "user/fetchLoggedUser",
  async () => {
    const response = await getLoggedUser();
    return response.data;
  }
);

export const acceptFriend = createAsyncThunk(
  "user/acceptFriend",
  async (userId: string) => {
    await acceptFriendRequest(userId);
    return userId;
  }
);

export const declineFriend = createAsyncThunk(
  "user/declineFriend",
  async (userId: string) => {
    await declineFriendRequest(userId);
    return userId;
  }
);

export const sendFriendRequest = createAsyncThunk(
  "user/sendFriendRequest",
  async (userId: string) => {
    await submitFriendRequest(userId);
    return userId;
  }
);

export const searchUsersAsync = createAsyncThunk(
  "user/searchUsers",
  async (searchTerm: string) => {
    const response = await searchUsers(searchTerm);
    return response.data;
  }
);

interface UserState {
  friends: UserWithId[];
  pendingFriends: UserWithId[];
  loggedUser: User | null;
}

const initialState: UserState = {
  friends: [],
  pendingFriends: [],
  loggedUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.friends = action.payload;
      })
      .addCase(fetchPendingFriends.fulfilled, (state, action) => {
        state.pendingFriends = action.payload;
      })
      .addCase(fetchLoggedUser.fulfilled, (state, action) => {
        console.log("Logged user fetched:", action.payload);
        state.loggedUser = action.payload;
      })
      .addCase(acceptFriend.fulfilled, (state, action) => {
        state.pendingFriends = state.pendingFriends.filter(
          (user) => user._id !== action.payload
        );
      })
      .addCase(declineFriend.fulfilled, (state, action) => {
        state.pendingFriends = state.pendingFriends.filter(
          (user) => user._id !== action.payload
        );
      });
  },
});

export default userSlice.reducer;
