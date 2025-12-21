"use client";

import { locales } from "@/i18n";
import { usePathname } from "next/navigation";

export default function BreadcrumbJsonLd() {
  const pathname = usePathname();
  const host = "https://www.neocraft.dev";

  const segments = pathname.split('/').filter(Boolean);
  const currentLocale = locales.find(l => segments[0] === l);
  
  // Real segments without the locale
  const breadcrumbSegments = currentLocale ? segments.slice(1) : segments;

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": currentLocale === 'fr' ? "Accueil" : "Home",
        "item": `${host}/${currentLocale || 'fr'}`
      },
      ...breadcrumbSegments.map((segment, index) => {
        const path = breadcrumbSegments.slice(0, index + 1).join('/');
        return {
          "@type": "ListItem",
          "position": index + 2,
          "name": segment.charAt(0) + segment.slice(1).replace(/-/g, ' '),
          "item": `${host}/${currentLocale || 'fr'}/${path}`
        };
      })
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}
