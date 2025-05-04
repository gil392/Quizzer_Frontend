import { InternalAxiosRequestConfig } from "axios";

export type RetriableAxiosConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export type SetAccessTokenFunction = (token: string | null) => void;
export const setUserIdInStorage = (userId: string | null) => {
  if (userId) {
    localStorage.setItem("userId", userId);
  } else {
    localStorage.removeItem("userId");
  }
};
