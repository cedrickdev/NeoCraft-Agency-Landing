import PrivacyContent from "@/components/section/privacy-content";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'Privacy' });
  
  return {
    title: `${t('title')} | NeoCraft`,
    description: t('description'),
  };
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <PrivacyContent />
    </main>
  );
}
