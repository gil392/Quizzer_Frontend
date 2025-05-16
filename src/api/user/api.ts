import { AxiosPromise } from "axios";
import apiClient from "../client";
import { QuizSettings } from "../quiz/types";
import { SearchedUser, User, UserWithId } from "./types";

export const searchUsers = (query: string): AxiosPromise<SearchedUser[]> =>
  apiClient.get("/user/search", { params: { q: query } });

export const getFriends = (abortController?: AbortController) =>
  apiClient.get<UserWithId[]>("/user/friend", {
    signal: abortController?.signal,
  });

export const getPendingFriends = (abortController?: AbortController) =>
  apiClient.get<UserWithId[]>("/user/friend/requests", {
    signal: abortController?.signal,
  });

const respondFriendRequest = (userId: string, respond: boolean) =>
  apiClient.put("/user/friend/answer", {
    friendRequester: userId,
    accepted: respond,
  });

export const acceptFriendRequest = (userId: string) =>
  respondFriendRequest(userId, true);

export const declineFriendRequest = (userId: string) =>
  respondFriendRequest(userId, false);

export const submitFriendRequest = (userId: string) =>
  apiClient.post("/user/friend", { user: userId });

export const getLoggedUser = (): AxiosPromise<User> =>
  apiClient.get("/user/me");

export const updateUser = async (
  baseUser: User,
  updateFields: {
    username?: string;
    settings?: QuizSettings;
  }
) => {
  const { username, settings } = updateFields;
  const updatedUser = {
    ...baseUser,
    username: username ?? baseUser.username,
    settings: settings ?? baseUser.settings,
  };

  return apiClient.put<User>("/user", updatedUser);
};
