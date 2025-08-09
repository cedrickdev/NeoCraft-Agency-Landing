// app/[locale]/page.tsx
'use client';

import { useTranslations } from 'next-intl';

export default function HomePage() {
    const t = useTranslations('Team');

    return (
        <main className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
            <p>{t('team')}</p>
            {/* Contenu de la page d'accueil */}
        </main>
    );
}