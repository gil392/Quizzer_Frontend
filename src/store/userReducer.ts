import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFriends,
  getPendingFriends,
  getLoggedUser,
  acceptFriendRequest,
  declineFriendRequest,
  updateUser,
} from "../api/user/api";
import { User, UserSettings, UserWithId } from "../api/user/types";

export const fetchFriends = createAsyncThunk(
  "user/fetchFriends",
  async (abortController?: AbortController) => {
    const response = await getFriends(abortController);
    return response.data;
  }
);

export const fetchPendingFriends = createAsyncThunk(
  "user/fetchPendingFriends",
  async (abortController?: AbortController) => {
    const response = await getPendingFriends(abortController);
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

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (updateFields: {
    username?: string;
    imageFile?: File;
    settings?: Partial<UserSettings>;
  }) => {
    const response = await updateUser(updateFields);
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
        state.loggedUser = action.payload;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        if (state.loggedUser) {
          state.loggedUser = {
            ...state.loggedUser,
            ...action.payload,
          };
        }
      })
      .addCase(acceptFriend.fulfilled, (state, action) => {
        const acceptedUser = state.pendingFriends.find(
          (user) => user._id === action.payload
        );
        if (acceptedUser) {
          state.friends.push(acceptedUser);
        }
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
