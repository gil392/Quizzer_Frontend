import { QuizSettings } from "../quiz/types";

export type User = {
  email: string;
  username: string;
  streak: number;
  friendRequests?: string[];
  friends?: string[];
  favoriteLessons?: string[];
  settings?: Partial<QuizSettings>;
};

export type Message = { reeded: boolean };
