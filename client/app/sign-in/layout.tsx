import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сторінка авторизації | SPECTRE",
  description: "Навчальні матеріали для курсантів та інструкторів.",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
