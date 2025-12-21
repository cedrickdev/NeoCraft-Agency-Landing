import { OutilsContent } from "@/components/section/outils-content";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'Outils' });
  
  return {
    title: `${t('title')} | NeoCraft`,
    description: t('description'),
  };
}

export default function OutilsPage() {
  return (
    <main className="pt-32 pb-20 min-h-screen">
      <OutilsContent />
    </main>
  );
}
