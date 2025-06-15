import { Metadata } from "next";
import OnlyPublicLayout from "../layouts/OnlyPublicLayout";

export const metadata: Metadata = {
  title: "Сторінка авторизації | SPECTRE",
  description: "Навчальні матеріали для курсантів та інструкторів.",
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <OnlyPublicLayout>{children}</OnlyPublicLayout>;
}
