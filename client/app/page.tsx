import { Metadata } from "next";
import { JSX } from "react";
import ApplySection from "./components/ApplySection";

export const metadata: Metadata = {
  title: "Welcome - Icarus Eye",
  description: "Learn about our UAV operator training school.",
};

export default function AboutPage(): JSX.Element {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4" id="about">
        Про нас
      </h1>
      <p className="text-lg">
        Ми є провідною школою підготовки операторів БПЛА, з фокусом на сучасні
        технології та бойову ефективність.
      </p>

      <h1 className="text-3xl font-bold mb-4" id="faq">
        FAQ
      </h1>
      <p className="text-lg">
        1. Ми є провідною школою підготовки операторів БПЛА, з фокусом на
        сучасні технології та бойову ефективність.
      </p>
      <p className="text-lg">
        2. Ми є провідною школою підготовки операторів БПЛА, з фокусом на
        сучасні технології та бойову ефективність.
      </p>
      <p className="text-lg">
        3. Ми є провідною школою підготовки операторів БПЛА, з фокусом на
        сучасні технології та бойову ефективність.
      </p>

      <ApplySection />
    </>
  );
}
