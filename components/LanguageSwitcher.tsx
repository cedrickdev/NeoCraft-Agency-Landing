// components/LocaleSwitcher.tsx
'use client';

import { locales } from '@/i18n';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  // Restaurer la position de défilement après changement de langue
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
      // Attendre que la page soit complètement chargée
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedPosition, 10));
        sessionStorage.removeItem('scrollPosition');
      });
    }
  }, []);

  const handleChange = useCallback((newLocale: string) => {
    if (newLocale === locale) return;

    // Sauvegarder la position de défilement pour la restaurer après navigation
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    
    // Construire la nouvelle URL
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    
    // Navigation complète pour garantir la mise à jour des traductions
    window.location.href = newPath;
  }, [locale, pathname]);

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
