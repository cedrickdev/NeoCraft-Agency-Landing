// i18n.ts
import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'fr'] as const;
export const defaultLocale = 'en';

export function getLocaleFromPath(pathname: string) {
    return locales.find((locale) => pathname.startsWith(`/${locale}/`)) ?? defaultLocale;
}

export default getRequestConfig(async ({ locale }) => {
    // Utiliser la locale fournie ou tomber sur la locale par défaut si undefined
    const resolvedLocale = locale || defaultLocale;

    return {
        locale: resolvedLocale,
        messages: (await import(`./messages/${resolvedLocale}.json`)).default
    };
});