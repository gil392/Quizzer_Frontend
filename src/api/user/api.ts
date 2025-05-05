import { AxiosPromise } from "axios";
import { User } from "./types";
import apiClient from "../client";

export const getLoggedUser = (): AxiosPromise<User> =>
  apiClient.get("/user/me");

export const updateUser = async (
  baseUser: User,
  updateFields: {
    username?: User["username"];
    defaultSettings?: User["defaultSettings"];
  }
) => {
  const { username, defaultSettings } = updateFields;
  const updatedUser: Omit<User, "email"> = {
    ...baseUser,
    username: username ?? baseUser.username,
    defaultSettings: defaultSettings ?? baseUser.defaultSettings,
  };

  return apiClient.put<User>("/user", updatedUser);
};
