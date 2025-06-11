import checkUserAchievements from "@/lib/checkUserAchievements";
import { assignAchievements } from "@/lib/assignAchievements";
import updateToken from "@/lib/update-token";
import { showSuccess, showError } from "@/utils/toast";
import AuthStatus from "@/types/client/AuthStatus";
import { Achievement } from "@shared/types";

export const tryAssignAchievements = async (
  userData: AuthStatus,
  setUserData: (user: AuthStatus) => void
): Promise<Achievement[]> => {
  try {
    if (!userData) return [];

    const passedAchievements = await checkUserAchievements(userData);
    const alreadyAssignedIds = userData.achievements || [];

    const newAchievements = passedAchievements.filter(
      (a) => !alreadyAssignedIds.includes(a._id)
    );

    if (newAchievements.length > 0) {
      const data = await assignAchievements({
        userId: userData.sub,
        achievements: newAchievements.map((a) => a._id),
      });

      const token = data.access_token;
      const { user } = await updateToken(token);
      setUserData(user);

      newAchievements.forEach((a) =>
        showSuccess(`🎉 Ви отримали досягнення "${a.title}"!`)
      );
    }

    return newAchievements;
  } catch (err: any) {
    showError(err.message);
    return [];
  }
};
