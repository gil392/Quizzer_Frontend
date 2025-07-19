import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFriends,
  getPendingFriends,
  getLoggedUser,
  acceptFriendRequest,
  declineFriendRequest,
  updateUser,
} from "../api/user/api";
import { UserSettings, UserWithId } from "../api/user/types";
import { logout } from "../api/authentication/api";
import { addHandlerWithToast } from "./addHandlerWithToast";

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

export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  const response = await logout();
  return response.data;
});

interface UserState {
  friends: UserWithId[];
  pendingFriends: UserWithId[];
  loggedUser: UserWithId | null;
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
    addHandlerWithToast(
      builder,
      fetchFriends,
      (state, action) => {
        state.friends = action.payload;
      },
      "fetch friends",
      true
    );
    addHandlerWithToast(
      builder,
      fetchPendingFriends,
      (state, action) => {
        state.pendingFriends = action.payload;
      },
      "fetch pending friends",
      true
    );
    addHandlerWithToast(
      builder,
      fetchLoggedUser,
      (state, action) => {
        state.loggedUser = action.payload;
      },
      "fetch logged user",
      true
    );
    addHandlerWithToast(
      builder,
      updateUserAsync,
      (state, action) => {
        if (state.loggedUser) {
          state.loggedUser = {
            ...state.loggedUser,
            ...action.payload,
          };
        }
      },
      "update user",
      true
    );
    addHandlerWithToast(
      builder,
      acceptFriend,
      (state, action) => {
        const acceptedUser = state.pendingFriends.find(
          (user) => user._id === action.payload
        );
        if (acceptedUser) {
          state.friends.push(acceptedUser);
        }
        state.pendingFriends = state.pendingFriends.filter(
          (user) => user._id !== action.payload
        );
      },
      "accept friend request",
      true
    );
    addHandlerWithToast(
      builder,
      declineFriend,
      (state, action) => {
        state.pendingFriends = state.pendingFriends.filter(
          (user) => user._id !== action.payload
        );
      },
      "decline friend request",
      true
    );
  },
});

export default userSlice.reducer;
