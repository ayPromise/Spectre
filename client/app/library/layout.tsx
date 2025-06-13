import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Бібліотека файлів | SPECTRE",
  description: "Навчальні матеріали для курсантів та інструкторів.",
};

export default function LibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
