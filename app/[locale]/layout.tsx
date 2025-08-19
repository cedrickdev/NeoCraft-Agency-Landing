import "../globals.css";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import type { Locale } from "@/i18n";
import { locales } from "@/i18n";
import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import CanonicalTag from "@/components/canonical-tag";
import HreflangTags from "@/components/HreflangTags";
import { ThemeProvider } from "@/components/providers";
import Footer from "@/components/section/footer";
import Header from "@/components/header";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
};

// Générer les paramètres statiques pour les locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ✅ GÉNÉRATION DYNAMIQUE DES METADATA EN FONCTION DE LA LOCALE
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const messages = await import(`../../messages/${locale}.json`).then(
    (mod) => mod.default
  );
  const seo = messages.Seo;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: seo.authors
      .split(",")
      .map((name: string) => ({ name: name.trim() })),
    openGraph: {
      title: "NeoCraft",
      description: seo.openGraph.description,
      url: "https://www.neocraft.dev",
      siteName: "NeoCraft",
      type: "website",
      locale: seo.openGraph.locale,
      images: [
        {
          url: "https://www.neocraft.dev/logo/logo512.png",
          width: 512,
          height: 512,
          alt: "NeoCraft Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "NeoCraft",
      description: seo.twitter.description,
      site: "@neocraft",
      creator: "@neocraft",
      images: ["https://www.neocraft.dev/logo/180"],
    },
  };
}

// Layout for the locale-specific pages
// This layout will be used for all pages under the [locale] directory
export default async function LocaleLayout({ children, params }: Props) {
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

  // JSON-LD ORGANIZATION
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NeoCraft",
    url: "https://www.neocraft.dev",
    logo: "https://www.neocraft.dev/logo/logo512.png",
    sameAs: [
      "https://x.com/neocraftdev",
      "https://www.linkedin.com/company/neocraftdev",
      "https://www.facebook.com/neocraftdev",
      "https://www.instagram.com/neocraftdev",
      "https://mastodon.social/@neocraftdev",
    ],
    foundingDate: "2025-03-25",
    description: messages.Seo.jsonLd.description,
    email: "support.neocraft.dev",
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

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <head>
        <meta name="description" content={messages.description} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <CanonicalTag />
        <HreflangTags />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/logo/logo48.png"
        />
        <meta
          name="google-site-verification"
          content="6AsUNXUX0cK-jPCNwuVgRKs0or51N4Vqk6mvwYw7Ve4"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script src="https://web.cmp.usercentrics.eu/modules/autoblocker.js"></script>
        <script id="usercentrics-cmp" src="https://web.cmp.usercentrics.eu/ui/loader.js" data-settings-id="oW4-gV9UfCaJnc" async></script>
        <script
          defer
          data-domain="neocraft.dev"
          src="https://plausible.io/js/script.pageview-props.tagged-events.js"
        ></script>
        {/* Meta Pixel Code */}
        <script
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
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt="Facebook Pixel"
            src="https://www.facebook.com/tr?id=1139222559815185&ev=PageView&noscript=1"
          />
        </noscript>
        {/* LinkedIn Insight Tag */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              _linkedin_partner_id = "7716050";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);

              (function(l) {
                if (!l) {
                  window.lintrk = function(a,b){
                    window.lintrk.q.push([a,b])
                  };
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
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt="LinkedIn Insight"
            src="https://px.ads.linkedin.com/collect/?pid=7716050&fmt=gif"
          />
        </noscript>
        {/* Microsoft Clarity*/}
        <script
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
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            {children}
            <SpeedInsights />
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        <Analytics />
      </body>
    </html>
  );
}
