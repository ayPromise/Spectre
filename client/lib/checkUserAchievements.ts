import AuthStatus from "@/types/client/AuthStatus";
import { canAssignAchievement } from "./canAssignAchievement";
import { getAchievements } from "@/app/achievements/utils/getAchievements";
import { Achievement } from "@shared/types";

async function checkUserAchievements(user: AuthStatus): Promise<Achievement[]> {
  const achievements = await getAchievements();

  const assignable = achievements.filter((ach) =>
    canAssignAchievement(user, ach)
  );

  return assignable;
}

export default checkUserAchievements;
