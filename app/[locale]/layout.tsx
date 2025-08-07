// app/[locale]/layout.tsx
import '../globals.css';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { locales } from '@/i18n';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
    params: Promise<{ locale: string }> | { locale: string };
};

// Générer les paramètres statiques pour les locales
export function generateStaticParams() {
    return locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
    // Attendre que les paramètres soient résolus
    const resolvedParams = await params;
    const locale = resolvedParams.locale;
    
    // Vérifier si la locale est valide, sinon afficher 404
    if (!locales.includes(locale as any)) {
        notFound();
    }

    // Charger les messages pour la locale spécifiée
    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        console.error(`Failed to load messages for locale: ${locale}`, error);
        messages = {};
    }

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}