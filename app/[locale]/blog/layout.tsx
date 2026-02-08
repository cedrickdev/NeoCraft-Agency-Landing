import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Script from "next/script";

const fontSans = IBM_Plex_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    display: "swap", // ✅ Optimisation performance font
});

export const metadata: Metadata = {
    title: "NeoBlog – Actualités, guides et tutos digitaux",
    description:
        "NeoBlog partage des conseils, tutoriels et actualités sur le développement web, marketing digital, SEO, IA et solutions numériques.",

    // ✅ Keywords pour SEO
    keywords: [
        "développement web",
        "marketing digital",
        "SEO",
        "intelligence artificielle",
        "tutoriels",
        "guides digitaux",
        "solutions numériques"
    ],

    // ✅ Auteurs enrichis
    authors: [{ name: "NeoCraft", url: "https://www.neocraft.dev" }],
    creator: "NeoCraft",
    publisher: "NeoCraft team",

    metadataBase: new URL("https://www.neocraft.dev"),

    // ✅ Configuration robots optimisée
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },

    // ✅ URLs canoniques et alternatives
    alternates: {
        canonical: '/fr/blog',
        languages: {
            'fr': '/fr/blog',
            'en': '/en/blog',
        },
    },

    openGraph: {
        title: "NeoCraft Blog – Actualités, guides et tutos digitaux",
        description:
            "NeoCraft Blog partage des conseils, tutoriels et actualités sur le développement web, marketing digital, SEO, IA et solutions numériques.",
        url: "https://www.neocraft.dev/blog",
        siteName: "NeoCraft",
        images: [
            {
                url: "https://www.neocraft.dev/images/og-image.png",
                width: 1200,
                height: 630,
                alt: "NeoCraft Blog - Actualités et guides digitaux",
            },
        ],
        locale: "fr_FR",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "NeoCraft Blog – Actualités digitales",
        description:
            "Guides et tutoriels sur le développement web, marketing digital et SEO.",
        creator: "@NeoCraftDev",
        site: "@NeoCraftDev", // ✅ Compte Twitter du site
        images: [{
            url: "https://www.neocraft.dev/images/og-image.png",
            alt: "NeoCraft Blog", // ✅ Alt text Twitter
        }],
    },

    // ✅ Métadonnées additionnelles
    category: 'technology',
    classification: 'Blog technologique et digital',

    // ✅ Autres métadonnées utiles
    other: {
        'article:author': 'NeoCraft',
        'article:publisher': 'NeoCraft',
        'og:updated_time': new Date().toISOString(),
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    // ✅ JSON-LD spécifique au blog
    const blogJsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "NeoCraft Blog",
        "description": "Blog sur le développement web, marketing digital, SEO et solutions numériques",
        "url": "https://www.neocraft.dev/blog",
        "publisher": {
            "@type": "Organization",
            "name": "NeoCraft",
            "url": "https://www.neocraft.dev",
            "logo": "https://www.neocraft.dev/logo/logo512.png"
        },
        "inLanguage": "fr-FR",
        "audience": {
            "@type": "Audience",
            "audienceType": ["Développeurs", "Entrepreneurs", "Marketeurs digitaux"]
        },
        "keywords": "développement web, marketing digital, SEO, IA, tutoriels",
        "about": [
            "Développement web",
            "Marketing digital",
            "SEO",
            "Intelligence artificielle",
            "Solutions numériques"
        ]
    };

    return (
        <>
            {/* ✅ RSS Feed link */}
            <link rel="alternate" type="application/rss+xml" title="NeoCraft Blog RSS" href="/rss.xml" />

            {/* ✅ JSON-LD structured data */}
            <Script
                id="blog-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(blogJsonLd)
                }}
            />

            <Providers>
                <div className={`${fontSans.variable} antialiased font-sans`}>
                    <div className="bg-white dark:bg-gray-950 transition-colors duration-300">
                        {children}
                    </div>
                </div>
            </Providers>
        </>
    );
}