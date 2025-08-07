import { defaultLocale, locales } from "@/i18n";
import { usePathname } from "next/navigation";
import { headers } from "next/headers";

export default async function HreflangTags() {
    const pathname = usePathname();
    const headersList = await headers();
    const host = headersList.get("host") || "www.neocraft.dev";
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