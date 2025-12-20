import About from "@/components/section/about";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos | NeoCraft",
  description: "Découvrez l'histoire, les valeurs et la mission de NeoCraft, votre agence partenaire pour l'excellence digitale.",
};

export default function AboutPage() {
  return (
    <main className="pt-20">
      <About />
    </main>
  );
}
