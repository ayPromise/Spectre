import { Metadata } from "next";
import AuthLayout from "../layouts/AuthLayout";

export const metadata: Metadata = {
  title: "Панель керування | SPECTRE",
  description: "Навчальні матеріали для курсантів та інструкторів.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
