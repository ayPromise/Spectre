import AuthStatus from "@/types/client/AuthStatus";
import { MaterialType } from "@shared/types";

const materialMap = {
  [MaterialType.Article]: "completedArticles",
  [MaterialType.Lecture]: "completedLectures",
  [MaterialType.Video]: "completedVideos",
} as const;

const isMaterialFinished = (
  userData: AuthStatus | null,
  type: MaterialType,
  materialId: string
): boolean => {
  if (!userData) return false;
  const key = materialMap[type];
  return userData[key]?.includes(materialId) ?? false;
};

export default isMaterialFinished;
