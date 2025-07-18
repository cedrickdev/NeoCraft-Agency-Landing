import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NeoCraft - L'artisanat du code, réinventé",
  description:
    "NeoCraft conçoit des solutions digitales sur mesure et forme les esprits techniques de demain. Développement web personnalisé, UI/UX et formation technique.",
  keywords:
    "développement web, startup tech, formation technique, UI/UX, solutions digitales",
  authors: [{ name: "Cedrick Feze" }],
  openGraph: {
    title: "NeoCraft",
    description:
      "Solutions digitales sur mesure et formation technique de qualité",
    url: "https://neocraftdev.vercel.app/",
    siteName: "NeoCraft",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "https://neocraft.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "NeoCraft - Artisanat du code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeoCraft",
    description: "L’artisanat du code au service de votre vision numérique.",
    site: "@neocraft",
    creator: "@neocraft",
    images: ["https://neocraft.dev/og-image.png"],
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
        <meta
          name="google-site-verification"
          content="iNDnJUeBgvHM6dLZFpFQP6SDlcQ04djSzYPoiZ5W4Ys"
        />
      </head>
      <body className={inter.className}>{children}</body>
      <GoogleAnalytics gaId="G-45NDXPYWFZ" />
      <Analytics />
    </html>
  );
}
