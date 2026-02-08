import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center mx-auto mb-8">
          <Search className="w-10 h-10 text-primary/30" />
        </div>
        <h1 className="text-7xl font-black tracking-tighter mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4 tracking-tight">{t("title")}</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          {t("description")}
        </p>
        <Button asChild className="rounded-full px-8 group">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{t("backToHome")}</span>
          </Link>
        </Button>
      </div>
    </main>
  );
}
