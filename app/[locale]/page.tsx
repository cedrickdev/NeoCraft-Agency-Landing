'use client';

import { useTranslations } from 'next-intl';
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function HomePage() {
    const t = useTranslations('Home');

    return (
        <main className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>
            <p>{t('description')}</p>
            <LanguageSwitcher />
        </main>
    );
}