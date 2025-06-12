import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Бібліотека польотів | SPECTRE",
  description: "Навчальні матеріали для курсантів та інструкторів.",
};

export default function FlightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
