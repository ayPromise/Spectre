import { Metadata } from "next";
import AuthLayout from "../layouts/AuthLayout";

export const metadata: Metadata = {
  title: "Розклад | SPECTRE",
  description: "Навчальні матеріали для курсантів та інструкторів.",
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
