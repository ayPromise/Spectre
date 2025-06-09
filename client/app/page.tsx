import dynamic from "next/dynamic";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome - Icarus Eye",
  description: "Learn about our UAV operator training school.",
};

const AboutPageClient = dynamic(() => import("./components/AboutPageClient"), {
  ssr: true,
});

export default function Page() {
  return <AboutPageClient />;
}
