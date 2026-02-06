import { RealizationList } from "@/components/RealizationList";
import { Button } from "@/components/ui/button";
import { wisp } from "@/lib/wisp";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const resolvedParams = await params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'Realisations' });
  
  return {
    title: `${t('title')} | NeoCraft`,
    description: t('description'),
  };
}

export default async function RealisationsPage(props: { params: { locale: string } }) {
  const resolvedParams = await props.params;
  const t = await getTranslations({ locale: resolvedParams.locale, namespace: 'Realisations' });
  
  // On récupère les posts taggués "Realisation" (minuscule ou majuscule selon l'usage habituel)
  // Note: Wisp API filter by tag usually works via the tag slug or name.
  // Pour plus de flexibilité, on peut récupérer tous les posts et filtrer, ou utiliser le paramètre tags.
  const result = await wisp.getPosts({
    limit: 20,
    tags: ["Realisation", "Projet"], // On accepte les deux tags
  });

  return (
    <main className="min-h-screen pb-20 pt-32">
       <div className="container mx-auto max-w-7xl px-4 mb-8">
          <Button variant="ghost" asChild className="group text-muted-foreground hover:text-primary transition-colors">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

      <div className="container mx-auto max-w-7xl px-4">
        <div className="max-w-3xl mb-24">
            <span className="text-[10px] uppercase tracking-[0.3em] font-black text-primary/40 mb-4 block">
                {t('badge')}
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
                {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
                {t('description')}
            </p>
        </div>
      </div>

      <RealizationList posts={result.posts} />
    </main>
  );
}
