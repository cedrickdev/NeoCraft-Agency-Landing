
// components/LocaleSwitcher.tsx
'use client';

import { locales } from '@/i18n';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (newLocale: string) => {
    if (newLocale === locale) return; // Évite navigation inutile

    const segments = pathname.split('/');
    segments[1] = newLocale; // On change juste la locale dans l’URL
    router.replace(segments.join('/'));
  };

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
