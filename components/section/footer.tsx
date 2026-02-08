import { Code2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { SocialIcons } from "../SocialIcons";

const year = new Date().getFullYear();

/**
 * Footer - Server Component
 * No client-side interactivity needed, renders immediately
 */
export default async function Footer() {
  const t = await getTranslations('footer');

  const serviceLinks = [
    { label: t('services.showcaseWebsite'), href: "/#services" },
    { label: t('services.ecommerceWebsite'), href: "/#services" },
    { label: t('services.development'), href: "/#services" },
    { label: t('services.ads'), href: "/#services" },
    { label: t('services.seo'), href: "/#services" }
  ];

  return (
    <footer className="relative bg-background border-t border-primary/5 pt-24 pb-12 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2 space-y-8">
            <div className="flex items-center">
              <Image
                src="/logo/logo.png"
                alt="NeoCraft"
                width={40}
                height={40}
                className="grayscale opacity-50 transition-all hover:opacity-100"
              />
            </div>
            
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              {t('description')}
            </p>

            <SocialIcons />
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-8 opacity-50">
              Services
            </h3>
            <ul className="space-y-4">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-8 opacity-50">
              {t('legal.title')}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                  {t('legal.policy')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © {year} NeoCraft. {t('copyright')}
          </p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground group">
              <span>{t('by')}</span>
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <Code2 className="w-4 h-4" />
                <span>NeoCraftTeam</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" aria-hidden="true" />
    </footer>
  );
}
