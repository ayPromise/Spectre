import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Створення користувача | SPECTRE",
  description: "Навчальні матеріали для курсантів та інструкторів.",
};

export default function CreateUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
