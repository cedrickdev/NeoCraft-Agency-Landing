import About from "@/components/section/about";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'About' });
  
  return {
    title: `${t('h2')} | NeoCraft`,
    description: t('card.description'),
  };
}

export default function AboutPage() {
  return (
    <main className="pt-24 min-h-screen">
      <About />
    </main>
  );
}
