import { Metadata } from "next";
import AuthLayout from "../layouts/AuthLayout";

export const metadata: Metadata = {
  title: "Мої досягення | SPECTRE",
  description: "Навчальні матеріали для курсантів та інструкторів.",
};

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
