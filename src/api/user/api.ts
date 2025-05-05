import { AxiosPromise } from "axios";
import { User } from "./types";
import apiClient from "../client";

export const getLoggedUser = (): AxiosPromise<User> =>
  apiClient.get("/user/me");
