import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мої досягення | SPECTRE",
  description: "Навчальні матеріали для курсантів та інструкторів.",
};

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
