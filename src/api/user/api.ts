import { isNil } from "ramda";
import apiClient from "../client";
import { Message } from "./types";

export const getMessages = (
  since?: number,
  abortController?: AbortController
) =>
  apiClient.get<Message[]>("/user/messages", {
    signal: abortController?.signal,
    params: isNil(since) ? { since } : {},
  });
