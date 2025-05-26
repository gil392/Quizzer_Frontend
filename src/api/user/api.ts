import { AxiosPromise } from "axios";
import { isNil } from "ramda";
import apiClient from "../client";
import { Message, User, UserSettings } from "./types";

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
