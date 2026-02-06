"use client";

import { MacbookScroll } from "@/components/ui/macbook-scroll";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function MacbookShowcase() {
  const t = useTranslations("macbook");

  return (
    <section className="overflow-hidden bg-background">
      <MacbookScroll
        title={
          <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            {t("title")}
          </span>
        }
        src="https://ui.aceternity.com/linear.webp"
        showGradient={true}
        badge={
          <Image
            src="/logo/logo.png"
            alt="NeoCraft"
            width={32}
            height={32}
            className="grayscale brightness-0 dark:invert opacity-40"
          />
        }
      />
    </section>
  );
}
