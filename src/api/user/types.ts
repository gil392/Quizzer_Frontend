type UserStatistics = {
  streak: number;
  xp?: number;
};

export type User = {
  username: string;
  email: string;
  picture?: string;
} & UserStatistics;

export type UserWithId = User & { _id: string };
export type SearchedUser = Omit<UserWithId, "streak" | "xp">;
