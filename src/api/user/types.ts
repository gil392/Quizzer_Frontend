type UserStatistics = {
  streak: number;
  xp: number;
};

export type User = {
  username: string;
  email: string;
  picture?: string;
  statistics: UserStatistics;
};
