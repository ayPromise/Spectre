import AuthStatus from "@/types/client/AuthStatus";
import { Achievement } from "@shared/types";

export function canAssignAchievement(
  user: AuthStatus,
  achievement: Achievement
): boolean {
  const completedMaterials = [
    ...user.completedArticles,
    ...user.completedVideos,
    ...user.completedLectures,
  ];

  const hasAllMaterials = achievement.requiredMaterials.every((material) =>
    completedMaterials.includes(material.id)
  );

  return hasAllMaterials;
}
