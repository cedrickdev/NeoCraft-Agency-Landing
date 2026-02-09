import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import CookieConsent from "@/components/CookieConsent";
import Header from "@/components/header";
import HreflangTags from "@/components/HreflangTags";
import { ThemeProvider } from "@/components/providers";
import Footer from "@/components/section/footer";
import { Toaster } from "@/components/ui/sonner";
import type { Locale } from "@/i18n";
import { locales } from "@/i18n";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Inter, Outfit } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ReactNode, Suspense } from "react";
import "../globals.css";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    preload: true,
    fallback: ['system-ui', 'arial'],
    adjustFontFallback: false,
    variable: '--font-inter'
});

const outfit = Outfit({
    subsets: ["latin"],
    display: "swap",
    preload: true,
    fallback: ['system-ui', 'arial'],
    adjustFontFallback: false,
    variable: '--font-outfit',
    weight: ['300', '400', '500', '600', '700']
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

        themeColor: [
            { media: '(prefers-color-scheme: light)', color: '#ffffff' },
            { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
        ],

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
                { url: '/logo/logo48.png', sizes: '48x48', type: 'image/png' },
                { url: '/logo/logo192.png', sizes: '192x192', type: 'image/png' },
                { url: '/logo/logo512.png', sizes: '512x512', type: 'image/png' },
            ],
            apple: [
                { url: '/logo/logo180.png', sizes: '180x180', type: 'image/png' },
            ],
            shortcut: '/logo/logo48.png',
        },

        manifest: '/manifest.json',

        other: {
            'color-scheme': 'light dark',
            'format-detection': 'telephone=no',
            'mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-capable': 'yes',
            'apple-mobile-web-app-status-bar-style': 'black-translucent',
            'msapplication-TileColor': '#1a73e8',

        },
    };
}

export default async function LocaleLayout({children, params}: Props) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;

    if (!locales.includes(locale as any)) {
        notFound();
    }

    // Enable static rendering and set the locale for all nested Server Components
    setRequestLocale(locale);

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
        "founder": {
            "@type": "Person",
            "name": "Cedrick Feze",
            "jobTitle": "Founder & CEO"
        },
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
        "inLanguage": [locale]
    };

    return (
        <html lang={locale} suppressHydrationWarning={true}>
        <head>
            {/* Meta robots, viewport, format-detection are handled by Next.js metadata API */}
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
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
            {/* Microsoft Clarity - Free Heatmaps & Session Recordings */}
            {process.env.NEXT_PUBLIC_CLARITY_ID && (
                <Script
                    id="microsoft-clarity"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            (function(c,l,a,r,i,t,y){
                                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
                        `,
                    }}
                />
            )}
        </head>
        <body className={`${inter.variable} ${outfit.variable} font-sans antialiased selection:bg-primary selection:text-white`}>
        <ThemeProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
                <BreadcrumbJsonLd />
                {/* Skip link for accessibility */}
                <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:text-sm focus:font-bold">
                    {locale === 'fr' ? 'Passer au contenu principal' : 'Skip to main content'}
                </a>
                <div className="relative min-h-screen bg-background selection:bg-primary selection:text-white overflow-x-hidden">
                    
                    {/* Multi-layered background - simplified on mobile for performance */}
                    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
                        <div className="absolute inset-0 bg-mesh opacity-60" />
                        <div className="hidden md:block absolute inset-0 bg-dot-pattern opacity-40" />
                        <div className="hidden md:block absolute inset-0 bg-dot-grid opacity-[0.03] dark:opacity-[0.05]" />
                        <div className="hidden md:block absolute inset-0 overflow-hidden">
                            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/[0.03] dark:bg-primary/[0.07] blur-[120px] rounded-full animate-slow-float" />
                            <div className="absolute bottom-[10%] right-[-5%] w-[45%] h-[45%] bg-primary/[0.03] dark:bg-primary/[0.07] blur-[100px] rounded-full animate-slow-float" style={{ animationDelay: '-5s' }} />
                        </div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col min-h-screen">
                        <Header/>
                        <main id="main-content" role="main" className="flex-grow">
                            {children}
                        </main>
                        <Suspense fallback={<FooterSkeleton />}>
                            <Footer/>
                        </Suspense>
                    </div>
                </div>
                <CookieConsent />
            </NextIntlClientProvider>
        </ThemeProvider>
        
        {/* Analytics - Deferred loading, non-blocking */}
        <Toaster position="top-center" richColors />
        <SpeedInsights/>
        <Analytics/>
        {process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID}/>
        )}
        </body>
        </html>
    );
}

// Footer skeleton for streaming
function FooterSkeleton() {
    return (
        <footer className="bg-background border-t border-primary/5 pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="animate-pulse grid md:grid-cols-4 gap-16 mb-20">
                    <div className="md:col-span-2 space-y-4">
                        <div className="w-10 h-10 bg-primary/10 rounded" />
                        <div className="h-4 w-3/4 bg-primary/5 rounded" />
                        <div className="h-4 w-1/2 bg-primary/5 rounded" />
                    </div>
                    <div className="space-y-4">
                        <div className="h-4 w-20 bg-primary/10 rounded" />
                        <div className="h-3 w-24 bg-primary/5 rounded" />
                        <div className="h-3 w-28 bg-primary/5 rounded" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
