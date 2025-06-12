import dynamic from "next/dynamic";

const AboutPageClient = dynamic(() => import("./components/AboutPageClient"), {
  ssr: true,
});

export default function Page() {
  return <AboutPageClient />;
}
