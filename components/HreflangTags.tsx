"use client";

import { defaultLocale, locales } from "@/i18n";
import { usePathname } from "next/navigation";

export default function HreflangTags() {
    const pathname = usePathname();
    const host = "www.neocraft.dev";
    const protocol = "https";

    // Strip the current locale from the beginning of the pathname
    const segments = pathname.split('/');
    const currentLocaleInPath = locales.find(l => segments[1] === l);
    const pathWithoutLocale = currentLocaleInPath 
        ? '/' + segments.slice(2).join('/') 
        : pathname;

    return (
        <>
            {locales.map((locale) => {
                const href = `${protocol}://${host}/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;

                return (
                    <link
                        key={locale}
                        rel="alternate"
                        hrefLang={locale}
                        href={href}
                    />
                );
            })}
            <link
                rel="alternate"
                hrefLang="x-default"
                href={`${protocol}://${host}/${defaultLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`}
            />
        </>
    );
}
