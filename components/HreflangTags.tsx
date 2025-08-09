"use client";

import { defaultLocale, locales } from "@/i18n";
import { usePathname } from "next/navigation";

export default function HreflangTags() {
    const pathname = usePathname();
    const host = typeof window !== "undefined" ? window.location.host : "www.neocraft.dev";
    const protocol = host.startsWith("localhost") ? "http" : "https";

    return (
        <>
            {locales.map((locale) => {
                const href =
                    locale === defaultLocale
                        ? `${protocol}://${host}${pathname}`
                        : `${protocol}://${host}/${locale}${pathname}`;

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
                href={`${protocol}://${host}${pathname}`}
            />
        </>
    );
}