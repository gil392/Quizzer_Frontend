import { QuizSettings } from "../quiz/types";

export type DisplayMode = "Light" | "Dark";

export type UserSettings = QuizSettings & {
  displayMode: DisplayMode;
};

export type User = {
  email: string;
  username: string;
  profileImage?: string;
  streak: number;
  xp: number;
  friendRequests?: string[];
  friends?: string[];
  favoriteLessons?: string[];
  picture?: string;
  settings?: Partial<UserSettings>;
};

export type UserWithId = User & { _id: string };
export type SearchedUser = Omit<UserWithId, "streak" | "xp">;

export type Message = { reeded: boolean };
