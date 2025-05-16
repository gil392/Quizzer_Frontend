import { QuizSettings } from "../quiz/types";

export type User = {
  email: string;
  username: string;
  streak: number;
  xp: number;
  friendRequests?: string[];
  friends?: string[];
  favoriteLessons?: string[];
  settings?: QuizSettings;
  picture?: string;
};

export type UserWithId = User & { _id: string };
export type SearchedUser = Omit<UserWithId, "streak" | "xp">;
