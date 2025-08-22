import "../globals.css";
import {notFound} from "next/navigation";
import {NextIntlClientProvider} from "next-intl";
import type {Locale} from "@/i18n";
import {locales} from "@/i18n";
import {ReactNode} from "react";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Analytics} from "@vercel/analytics/next";
import {GoogleAnalytics} from "@next/third-parties/google";
import HreflangTags from "@/components/HreflangTags";
import {ThemeProvider} from "@/components/providers";
import Footer from "@/components/section/footer";
import Header from "@/components/header";
import {SpeedInsights} from "@vercel/speed-insights/next"
import Script from "next/script";

const inter = Inter({
    subsets: ["latin"],
    display: "swap", // ✅ Optimisation des fonts
    preload: true
});

type Props = {
    children: ReactNode;
    params: Promise<{ locale: string }> | { locale: string };
};

// Générer les paramètres statiques pour les locales
export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

// ✅ GÉNÉRATION DYNAMIQUE DES METADATA EN FONCTION DE LA LOCALE
export async function generateMetadata({
                                           params,
                                       }: {
    params: { locale: string };
}): Promise<Metadata> {
    const resolvedParams = await params;
    const {locale} = resolvedParams;

    if (!locales.includes(locale as Locale)) {
        return {};
    }

    const messages = await import(`../../messages/${locale}.json`).then(
        (mod) => mod.default
    );
    const seo = messages.Seo;

    return {
        title: {
            default: seo.title,
            template: `%s | ${seo.title}` // ✅ Template pour les pages enfants
        },
        description: seo.description,
        keywords: seo.keywords,
        authors: seo.authors
            .split(",")
            .map((name: string) => ({name: name.trim()})),

        // ✅ CANONICAL ET ALTERNATES - Essentiel contre le duplicate content
        metadataBase: new URL("https://www.neocraft.dev"),
        alternates: {
            canonical: `/${locale}`,
            languages: {
                'fr': '/fr',
                'en': '/en',
                'x-default': '/fr', // Langue par défaut
            },
        },

        // ✅ ROBOTS optimisé + X-ROBOTS-TAG
        robots: {
            index: true,
            follow: true,
            noarchive: false,
            nosnippet: false,
            noimageindex: false,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
                noimageindex: false,
            },
        },

        // ✅ AJOUT DES BALISES MANQUANTES
        category: 'technology',
        classification: 'Business',

        // ✅ Optimisation Open Graph
        openGraph: {
            title: seo.title,
            description: seo.openGraph.description,
            url: `https://www.neocraft.dev/${locale}`,
            siteName: "NeoCraft",
            type: "website",
            locale: seo.openGraph.locale,
            alternateLocale: locale === 'fr' ? 'en' : 'fr',
            images: [
                {
                    url: "https://www.neocraft.dev/logo/logo512.png",
                    width: 512,
                    height: 512,
                    alt: "NeoCraft Logo",
                    type: "image/png",
                },
                {
                    url: "https://www.neocraft.dev/og-image.jpg", // ✅ Image OG dédiée
                    width: 1200,
                    height: 630,
                    alt: "NeoCraft - Votre partenaire digital",
                    type: "image/jpeg",
                },
            ],
        },

        // ✅ Twitter optimisé
        twitter: {
            card: "summary_large_image",
            title: seo.title,
            description: seo.twitter.description,
            site: "@neocraftdev",
            creator: "@neocraftdev",
            images: [{
                url: "https://www.neocraft.dev/logo/logo512.png",
                alt: "NeoCraft Logo",
                width: 512,
                height: 512,
            }],
        },

        // ✅ AUTRES BALISES SEO
        publisher: "NeoCraft",
        creator: "NeoCraft",
        applicationName: "NeoCraft",
        referrer: 'origin-when-cross-origin',

        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },

        // ✅ VERIFICATION ET AUTRES
        verification: {
            google: '6AsUNXUX0cK-jPCNwuVgRKs0or51N4Vqk6mvwYw7Ve4',
        },

        // ✅ ICÔNES OPTIMISÉES
        icons: {
            icon: [
                { url: '/logo/logo16.png', sizes: '16x16', type: 'image/png' },
                { url: '/logo/logo32.png', sizes: '32x32', type: 'image/png' },
                { url: '/logo/logo48.png', sizes: '48x48', type: 'image/png' },
            ],
            apple: [
                { url: '/logo/logo180.png', sizes: '180x180', type: 'image/png' },
            ],
            other: [
                { rel: 'mask-icon', url: '/logo/safari-pinned-tab.svg', color: '#1a73e8' },
            ],
        },

        // ✅ MANIFEST
        manifest: '/manifest.json',

        // ✅ AUTRES MÉTADONNÉES
        other: {
            'theme-color': '#1a73e8',
            'color-scheme': 'light dark',
            'format-detection': 'telephone=no',
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'black-translucent',
            'msapplication-TileColor': '#1a73e8',
            'msapplication-config': '/browserconfig.xml',
        },
    };
}

// Layout for the locale-specific pages
export default async function LocaleLayout({children, params}: Props) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;

    if (!locales.includes(locale as any)) {
        notFound();
    }

    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        console.error(`Failed to load messages for locale: ${locale}`, error);
        messages = {};
    }

    // ✅ JSON-LD OPTIMISÉ
    const jsonLdOrganization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "NeoCraft",
        "url": "https://www.neocraft.dev",
        "logo": {
            "@type": "ImageObject",
            "url": "https://www.neocraft.dev/logo/logo512.png",
            "width": 512,
            "height": 512
        },
        "image": "https://www.neocraft.dev/logo/logo512.png",
        "sameAs": [
            "https://x.com/neocraftdev",
            "https://www.linkedin.com/company/neocraftdev",
            "https://www.facebook.com/neocraftdev",
            "https://www.instagram.com/neocraftdev",
            "https://mastodon.social/@neocraftdev"
        ],
        "foundingDate": "2023-03-25",
        "foundingLocation": {
            "@type": "Place",
            "name": "Lausanne, Switzerland"
        },
        "slogan": "Votre partenaire digital de confiance",
        "description": `${messages.Seo?.jsonLd?.description || 'Solutions digitales innovantes'} - Entreprise en cours de création`,
        "knowsAbout": ["Développement web", "Applications mobiles", "Solutions digitales", "Next.js", "React"],
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "support@neocraft.dev",
            "telephone": "+41778078806",
            "contactType": "Customer Support",
            "areaServed": ["CH", "FR", "CM"],
            "availableLanguage": ["fr", "en"]
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": 4.7,
            "bestRating": 5,
            "worstRating": 1,
            "ratingCount": 13000
        },
        "founder": {
            "@type": "Person",
            "name": "Cedrick Feze",
            "jobTitle": "Founder & CEO"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00",
                "validFrom": "2023-03-25"
            },
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "10:00",
                "closes": "14:00",
                "validFrom": "2023-03-25"
            }
        ],
        "award": "Prix de l'innovation 2024",
        "employee": [
            {
                "@type": "Person",
                "name": "Jorel KUE",
                "jobTitle": "Lead Developer"
            },
            {
                "@type": "Person",
                "name": "Cédrick FEZE",
                "jobTitle": "Product Owner"
            },
            {
                "@type": "Person",
                "name": "Stéphane KAMGA",
                "jobTitle": "Mobile Developer"
            }
        ],
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lausanne",
            "addressCountry": "CH"
        }
    };

    // ✅ JSON-LD WEBSITE
    const jsonLdWebsite = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "NeoCraft",
        "url": "https://www.neocraft.dev",
        "description": messages.Seo?.description || "Solutions digitales innovantes",
        "publisher": {
            "@type": "Organization",
            "name": "NeoCraft"
        },
        "inLanguage": [locale],
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.neocraft.dev/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <html lang={locale} suppressHydrationWarning={true}>
        <head>
            {/* ✅ BALISES ROBOTS EXPLICITES */}
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="bingbot" content="index, follow" />

            {/* ✅ PERFORMANCE ET UX */}
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="format-detection" content="telephone=no, address=no, email=no" />

            {/* ✅ SÉCURITÉ */}
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            <meta name="referrer" content="strict-origin-when-cross-origin" />

            {/* ✅ HREFLANG */}
            <HreflangTags/>

            {/* ✅ JSON-LD STRUCTURÉS */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLdOrganization).replace(/</g, '\\u003c'),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLdWebsite).replace(/</g, '\\u003c'),
                }}
            />

            {/* Plausible - Chargement différé  */}
            <Script
                id="plausible-analytics"
                defer
                data-domain="neocraft.dev"
                src="https://plausible.io/js/script.pageview-props.tagged-events.js"
                strategy="afterInteractive"
            />

            {/* META PIXEL  */}
            <Script
                id="facebook-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '1139222559815185');
                        fbq('track', 'PageView');
                    `,
                }}
            />

            {/* LINKEDIN INSIGHT  */}
            <Script
                id="linkedin-insight"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        _linkedin_partner_id = "7716050";
                        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
                        (function(l) {
                            if (!l) {
                                window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                                window.lintrk.q=[]
                            }
                            var s = document.getElementsByTagName("script")[0];
                            var b = document.createElement("script");
                            b.type = "text/javascript";b.async = true;
                            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                            s.parentNode.insertBefore(b, s);
                        })(window.lintrk);
                    `,
                }}
            />

            {/* MICROSOFT CLARITY */}
            <Script
                id="microsoft-clarity"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "stwr04cffp");
                    `,
                }}
            />

            {/* NOSCRIPT FALLBACKS */}
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{display: "none"}}
                    alt="Facebook Pixel"
                    src="https://www.facebook.com/tr?id=1139222559815185&ev=PageView&noscript=1"
                />
                <img
                    height="1"
                    width="1"
                    style={{display: "none"}}
                    alt="LinkedIn Insight"
                    src="https://px.ads.linkedin.com/collect/?pid=7716050&fmt=gif"
                />
            </noscript>
            <title>Neocraft</title>
        </head>

        <body className={inter.className}>
        <ThemeProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <Header/>
                <main id="main-content" role="main">
                    {children}
                </main>
                <Footer/>
            </NextIntlClientProvider>
        </ThemeProvider>

        {/* ANALYTICS EN FIN DE BODY */}
        <SpeedInsights/>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!}/>
        <Analytics/>
        </body>
        </html>
    );
}