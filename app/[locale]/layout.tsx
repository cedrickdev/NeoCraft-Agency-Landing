import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import Header from "@/components/header";
import HreflangTags from "@/components/HreflangTags";
import { ThemeProvider } from "@/components/providers";
import Footer from "@/components/section/footer";
import type { Locale } from "@/i18n";
import { locales } from "@/i18n";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ReactNode } from "react";
import "../globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    preload: true,
    fallback: ['system-ui', 'arial'],
    adjustFontFallback: false,
    variable: '--font-inter'
});

type Props = {
    children: ReactNode;
    params: Promise<{ locale: string }> | { locale: string };
};

export function generateStaticParams() {
    return locales.map((locale) => ({locale}));
}

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
            template: `%s | ${seo.title}`
        },
        description: seo.description,
        keywords: seo.keywords,
        authors: seo.authors
            .split(",")
            .map((name: string) => ({name: name.trim()})),

        metadataBase: new URL("https://www.neocraft.dev"),
        alternates: {
            canonical: `/${locale}`,
            languages: {
                'fr': '/fr',
                'en': '/en',
                'x-default': '/fr',
            },
        },

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

        category: 'technology',
        classification: 'Business',

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
                    url: "https://www.neocraft.dev/og-image.jpg",
                    width: 1200,
                    height: 630,
                    alt: "NeoCraft - Votre partenaire digital",
                    type: "image/jpeg",
                },
            ],
        },

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

        publisher: "NeoCraft",
        creator: "NeoCraft",
        applicationName: "NeoCraft",
        referrer: 'origin-when-cross-origin',

        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },

        verification: {
            google: '6AsUNXUX0cK-jPCNwuVgRKs0or51N4Vqk6mvwYw7Ve4',
        },

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

        manifest: '/manifest.json',

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
        "award": "Prix de l'innovation 2024",
    };

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
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="bingbot" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta name="format-detection" content="telephone=no, address=no, email=no" />
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
            <meta name="referrer" content="strict-origin-when-cross-origin" />
            <HreflangTags/>
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
            <Script
                id="plausible-analytics"
                defer
                data-domain="neocraft.dev"
                src="https://plausible.io/js/script.pageview-props.tagged-events.js"
                strategy="afterInteractive"
            />
            {/* Meta Pixel, LinkedIn, Clarity scripts can be added here similarly */}
        </head>
        <body className={`${inter.variable} font-sans antialiased selection:bg-primary selection:text-white`}>
        <ThemeProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <BreadcrumbJsonLd />
                <div className="relative min-h-screen bg-background selection:bg-primary selection:text-white overflow-x-hidden">
                    
                    {/* Multi-layered background */}
                    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
                        <div className="absolute inset-0 bg-mesh opacity-60" />
                        <div className="absolute inset-0 bg-dot-pattern opacity-40" />
                        <div className="absolute inset-0 bg-dot-grid opacity-[0.03] dark:opacity-[0.05]" />
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/[0.03] dark:bg-primary/[0.07] blur-[120px] rounded-full animate-slow-float" />
                            <div className="absolute bottom-[10%] right-[-5%] w-[45%] h-[45%] bg-primary/[0.03] dark:bg-primary/[0.07] blur-[100px] rounded-full animate-slow-float" style={{ animationDelay: '-5s' }} />
                            <div className="absolute top-[20%] right-[10%] w-[35%] h-[35%] bg-primary/[0.02] dark:bg-primary/[0.05] blur-[80px] rounded-full animate-slow-float" style={{ animationDelay: '-10s' }} />
                        </div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col min-h-screen">
                        <Header/>
                        <main id="main-content" role="main" className="flex-grow">
                            {children}
                        </main>
                        <Footer/>
                    </div>
                </div>
            </NextIntlClientProvider>
        </ThemeProvider>
        <SpeedInsights/>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!}/>
        <Analytics/>
        </body>
        </html>
    );
}
