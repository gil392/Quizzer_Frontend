import { AxiosPromise } from "axios";
import { isNil } from "ramda";
import apiClient from "../client";
import { Message, SearchedUser, User, UserSettings, UserWithId } from "./types";

export const searchUsers = (searchTerm: string): AxiosPromise<SearchedUser[]> =>
  apiClient.get("/user/search", { params: { searchTerm } });

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

export const getMessages = (
  since?: number,
  abortController?: AbortController
) =>
  apiClient.get<Message[]>("/user/messages", {
    signal: abortController?.signal,
    params: isNil(since) ? { since } : {},
  });

export const getLoggedUser = (): AxiosPromise<User> =>
  apiClient.get("/user/me");

export const updateUser = async (updateFields: {
  username?: string;
  imageFile?: File;
  settings?: Partial<UserSettings>;
}) => {
  const { username, imageFile, settings } = updateFields;
  const imageUrl = imageFile ? await uploadProfileImage(imageFile) : null;
  const profileImage = imageUrl?.data;
  return apiClient.put<User>("/user", { username, profileImage, settings });
};

export const uploadProfileImage = (profileImage: File) => {
  const formData = new FormData();
  formData.append("profileImage", profileImage);
  return apiClient.post<string>("api/files/profile-image", formData, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
};

export const deleteFriend = (userId: string) =>
  apiClient.delete(`/user/friend/${userId}`);

export const fetchFriendById = (userId: string): AxiosPromise<UserWithId> =>
  apiClient.get<UserWithId>(`/user/friend/${userId}`);
