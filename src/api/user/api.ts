import { AxiosPromise } from "axios";
import apiClient from "../client";
import { abortableRequest } from "../utils";
import { SearchedUser, UserWithId } from "./types";

export const searchUsers = (query: string): AxiosPromise<SearchedUser[]> =>
  apiClient.get("/user/search", { params: { q: query } });

export const getFriends = () =>
  abortableRequest((abortController) =>
    apiClient.get<UserWithId[]>("/user/friend", {
      signal: abortController.signal,
    })
  );

export const getFriendsRequest = () =>
  abortableRequest((abortController) =>
    apiClient.get<UserWithId[]>("/user/friend/requests", {
      signal: abortController.signal,
    })
  );

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
