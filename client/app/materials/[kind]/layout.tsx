import { Metadata } from "next";
import { MaterialType } from "@shared/types/Enums";
import AuthLayout from "@/app/layouts/AuthLayout";

type Props = {
  children: React.ReactNode;
  params: Promise<{ kind: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kind } = await params;
  const normalizedKind = (kind.charAt(0).toUpperCase() +
    kind.slice(1).toLowerCase()) as MaterialType;
  let kindName = "Матеріали";

  switch (normalizedKind) {
    case MaterialType.Article:
      kindName = "Статті";
      break;
    case MaterialType.Lecture:
      kindName = "Лекції";
      break;
    case MaterialType.Video:
      kindName = "Відео";
      break;
    default:
      break;
  }

  return {
    title: `${kindName} | SPECTRE`,
    description: `Навчальні матеріали типу: ${kindName.toLowerCase()}.`,
  };
}

export default function MaterialsByKindLayout({ children }: Props) {
  return <AuthLayout>{children}</AuthLayout>;
}
