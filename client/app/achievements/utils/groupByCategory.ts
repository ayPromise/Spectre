import { Achievement } from "@shared/types";

const groupByCategory = (achievements: Achievement[]) => {
  return achievements.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof achievements>);
};

export default groupByCategory;
