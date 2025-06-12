import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мій профіль | SPECTRE",
  description: "Навчальні матеріали для курсантів та інструкторів.",
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
