import { isNil } from "ramda";
import apiClient from "../client";

export const getMessages = (
  since?: number,
  abortController?: AbortController
) =>
  apiClient.get<{}[]>("/user/messages", {
    signal: abortController?.signal,
    params: isNil(since) ? { since } : {},
  });
