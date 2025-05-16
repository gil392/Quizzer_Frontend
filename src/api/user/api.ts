import { AxiosPromise } from "axios";
import { isNil } from "ramda";
import apiClient from "../client";
import { QuizSettings } from "../quiz/types";
import { Message, User } from "./types";

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
