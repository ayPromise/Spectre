import { Award, Book, BookOpenCheck } from "lucide-react";

const getAchievementIcon = (category: string, isGotten: boolean) => {
  const baseClasses = "h-full w-full";
  const glowClasses = "text-indigo-500 drop-shadow-glow";

  if (category.includes("Акт 1"))
    return (
      <Book
        className={`${baseClasses} ${isGotten ? glowClasses : "text-black"}`}
      />
    );
  if (category.includes("Акт 2"))
    return (
      <BookOpenCheck
        className={`${baseClasses} ${isGotten ? glowClasses : "text-black"}`}
      />
    );
  return (
    <Award
      className={`${baseClasses} ${isGotten ? glowClasses : "text-black"}`}
    />
  );
};

export default getAchievementIcon;
