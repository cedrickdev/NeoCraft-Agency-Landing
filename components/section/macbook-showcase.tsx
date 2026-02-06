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
        src="/images/placeholder.webp"
        showGradient={true}
        badge={
          <div className="flex items-center gap-2">
            <Image
              src="/logo/logo.png"
              alt="NeoCraft"
              width={24}
              height={24}
              className="rounded-sm"
            />
            <span className="text-xs font-medium text-neutral-400">
              NeoCraft
            </span>
          </div>
        }
      />
    </section>
  );
}
