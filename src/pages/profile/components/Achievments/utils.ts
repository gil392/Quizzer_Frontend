import { Achievement } from "../../../../api/achievements/types";

export const sortAchievementsLeastCompleted = (achievements: Achievement[]) =>
  achievements.sort(
    (a, b): number => Number(a.isCompleted) - Number(b.isCompleted)
  );
