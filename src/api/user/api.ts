import { AxiosPromise } from "axios";
import { User } from "./types";
import apiClient from "../client";
import { QuizSettings } from "../quiz/types";

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
