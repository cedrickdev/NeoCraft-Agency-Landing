import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "NeoCraft Blog – Actualités, guides et tutos digitaux",
    description:
        "NeoCraft Blog partage des conseils, tutoriels et actualités sur le développement web, marketing digital, SEO, IA et solutions numériques.",
    authors: [{ name: "NeoCraft" }],
    metadataBase: new URL("https://www.neocraft.dev"),
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
        images: ["https://www.neocraft.dev/images/og-image.png"],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <Providers>
          <div className={`${fontSans.variable} antialiased font-sans`}>
          <div className=" bg-white dark:bg-gray-950 transition-colors duration-300"> 
          {children}
          </div>
          </div>
        </Providers>


  );
}
