import { Metadata } from "next";
import SubNavHeader from "./components/SubNavHeader";
import AuthLayout from "../layouts/AuthLayout";

export const metadata: Metadata = {
  title: "Матеріали | SPECTRE",
  description: "Навчальні матеріали для курсантів та інструкторів.",
};

export default function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLayout>
      <SubNavHeader />
      {children}
    </AuthLayout>
  );
}
