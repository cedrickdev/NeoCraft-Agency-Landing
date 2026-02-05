// components/LocaleSwitcher.tsx
'use client';

import { locales } from '@/i18n';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = useCallback((newLocale: string) => {
    if (newLocale === locale) return;

    // Sauvegarder la position de défilement actuelle
    const scrollY = window.scrollY;
    
    // Construire la nouvelle URL
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    // Naviguer avec scroll: false pour éviter le retour en haut
    router.replace(newPath, { scroll: false });
    
    // Restaurer la position après un court délai (pour que la navigation soit complète)
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
  }, [locale, pathname, router]);

  return (
    <div className="flex gap-2">
      {locales.map((l) => (
        <span
          key={l}
          onClick={() => handleChange(l)}
          className={`cursor-pointer select-none transition-colors duration-300 ${
            locale === l
              ? "text-primary font-black"
              : "text-muted-foreground/40 hover:text-muted-foreground"
          }`}
        >
          {l.toUpperCase()}
        </span>
      ))}
    </div>
  );
}
