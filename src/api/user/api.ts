import { AxiosPromise } from "axios";
import { User } from "./types";
import apiClient from "../client";

export const getLoggedUser = (): AxiosPromise<User> =>
  apiClient.get("/user/me");

export const updateUser = async (
  baseUser: User,
  updateFields: {
    username?: User["username"];
    settings?: User["settings"];
  }
) => {
  const { username, settings } = updateFields;
  const updatedUser: Omit<User, "email"> = {
    ...baseUser,
    username: username ?? baseUser.username,
    settings: settings ?? baseUser.settings,
  };

  return apiClient.put<User>("/user", updatedUser);
};
