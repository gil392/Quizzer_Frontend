import apiClient from "../client";
import { LoginFormData, LoginResponse, RegisterFormData } from "./types";

export const registerUser = (registerForm: RegisterFormData) =>
  apiClient.post("/auth/register", registerForm);

export const loginUser = (loginForm: LoginFormData) =>
  apiClient.post<LoginResponse>("/auth/login", loginForm);

export const refreshAuthAccessToken = () =>
  apiClient.get<LoginResponse>("/auth/refresh");

export const logout = () => apiClient.post("/auth/logout");

export const googleLogin = () => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;

