import { QuizSettings } from "../quiz/types";

export type DisplayMode = "Light" | "Dark";

export type UserSettings = QuizSettings & {
  displayMode: DisplayMode;
};

export type User = {
  email: string;
  username: string;
  streak: number;
  friendRequests?: string[];
  friends?: string[];
  favoriteLessons?: string[];
  settings?: Partial<UserSettings>;
};

export type Message = { reeded: boolean };
