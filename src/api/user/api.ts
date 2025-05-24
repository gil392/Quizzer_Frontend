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
  settings?: Partial<UserSettings>;
}) => {
  return apiClient.put<User>("/user", updateFields);
};
