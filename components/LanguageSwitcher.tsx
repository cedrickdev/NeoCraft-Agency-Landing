
// components/LocaleSwitcher.tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n';

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
              className={`cursor-pointer select-none  ${
                  locale === l
                      ? "bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent hover:from-blue-700 hover:to-emerald-600 font-bold"
                      : "text-black dark:text-gray-200"
              }`}
          >
  {l.toUpperCase()}
</span>
      ))}
    </div>
  );
}
