import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Панель керування | SPECTRE",
  description: "Навчальні матеріали для курсантів та інструкторів.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
