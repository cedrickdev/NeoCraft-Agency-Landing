import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import CanonicalTag from "@/components/canonical-tag";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeoCraft - L'innovation web pour un succès numérique",
  description:
    "NeoCraft est une agence digitale spécialisée dans le développement web offrant des solutions personnalisées pour répondre aux besoins et exigences spécifiques de vos projets. Nous couvrons différents domaines tels que le développement web sur mesure, l'e-commerce (WooCommerce, Shopify), le design UI/UX, la consultation technique ainsi que la formation en développement web. Notre équipe expérimentée et creative est à votre disposition pour vous accompagner dans vos projets numériques et digitaux.",
  keywords:
    "développement web, startup tech, formation technique, UI/UX, solutions digitales",
  authors: [{ name: "Cedrick Feze" }],
  openGraph: {
    title: "NeoCraft",
    description:
      "Solutions digitales sur mesure et formation technique de qualité",
    url: "https://www.neocraft.dev",
    siteName: "NeoCraft",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "https://neocraft.dev/logo/logo512.png",
        width: 512,
        height: 512,
        alt: "NeoCraft Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoCraft",
    description: "L'innovation web pour un succès numérique.",
    site: "@neocraft",
    creator: "@neocraft",
    images: ["https://www.neocraft.dev/logo/180"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NeoCraft",
  url: "https://www.neocraft.dev",
  logo: "https://www.neocraft.dev/logo/logo512.png",
  sameAs: [
    "https://twitter.com/neocraft",
    "https://www.linkedin.com/company/neocraft",
  ],
  description:
    "NeoCraft est une agence digitale spécialisée dans le développement des solutions IT",
  email: "contact.neocraft.dev",
  telephone: "+33 6 27 00 00 00",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: 4.7,
    ratingCount: 13000,
  },
  founder: {
    "@type": "Person",
    name: "Cedrick Feze",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <CanonicalTag />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/logo/logo48.png"
        ></link>
        <meta
          name="google-site-verification"
          content="6AsUNXUX0cK-jPCNwuVgRKs0or51N4Vqk6mvwYw7Ve4"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      <Analytics />
    </html>
  );
}
