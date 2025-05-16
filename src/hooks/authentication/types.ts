import { InternalAxiosRequestConfig } from "axios";

export type RetriableAxiosConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export type SetAccessTokenFunction = (token: string | null) => void;
