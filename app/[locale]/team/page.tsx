import TeamContent from "@/components/section/team-content";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'Team' });
  
  return {
    title: `${t('title')} | NeoCraft`,
    description: t('description'),
  };
}

export default function TeamPage() {
  return <TeamContent />;
}
