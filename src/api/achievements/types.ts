export type Reward = {
  icon: string;
  xp: number;
};

export type RequirmentProgress = { count: number; value: number };

export type Achievement = {
  _id: string;
  title: string;
  description: string;
  reward: Reward;
  requirements: RequirmentProgress[];
  isCompleted: boolean;
  sharedUsers: string[];
};
