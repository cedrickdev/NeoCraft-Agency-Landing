'use client';

import { Button } from '@/components/ui/button';
import { getCookie, setCookie } from 'cookies-next';
import { AnimatePresence, motion } from 'framer-motion';
import { Settings, Shield, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export default function CookieConsent() {
  const t = useTranslations('CookieConsent');
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const consent = getCookie('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        setPreferences(JSON.parse(consent as string));
      } catch {
        setPreferences(defaultPreferences);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    setCookie('cookie-consent', JSON.stringify(prefs), {
      maxAge: 365 * 24 * 60 * 60,
      sameSite: 'strict',
    });
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);

    if (prefs.analytics && typeof window !== 'undefined') {
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted',
      });
      window.clarity?.('consent');
    }
    
    if (prefs.marketing && typeof window !== 'undefined') {
      window.gtag?.('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }
  };

  const acceptAll = () => {
    savePreferences({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  };

  const rejectAll = () => {
    savePreferences({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  };

  const saveCustom = () => {
    savePreferences(preferences);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 md:p-6"
      >
        <div className="mx-auto max-w-4xl">
          <div className="relative bg-background border border-primary/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-primary" />
            
            <div className="p-4 sm:p-6">
              {!showSettings ? (
                // Main Banner
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-1">{t('title')}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {t('description')}{' '}
                      <Link href="/privacy-policy" className="text-primary hover:underline">
                        {t('learnMore')}
                      </Link>
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSettings(true)}
                      className="w-full sm:w-auto text-xs sm:text-sm"
                    >
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      {t('customize')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={rejectAll}
                      className="w-full sm:w-auto text-xs sm:text-sm"
                    >
                      {t('rejectAll')}
                    </Button>
                    <Button
                      size="sm"
                      onClick={acceptAll}
                      className="w-full sm:w-auto text-xs sm:text-sm bg-primary hover:bg-primary/90"
                    >
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                      {t('acceptAll')}
                    </Button>
                  </div>
                </div>
              ) : (
                // Settings Panel
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <h3 className="font-bold text-base sm:text-lg flex items-center gap-2">
                      <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                      {t('settings.title')}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowSettings(false)}
                      className="h-8 w-8"
                    >
                      <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    {/* Necessary Cookies */}
                    <div className="flex items-start justify-between p-3 sm:p-4 rounded-lg bg-muted/50 gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-xs sm:text-sm">{t('settings.necessary.title')}</h4>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                          {t('settings.necessary.description')}
                        </p>
                      </div>
                      <div className="flex items-center flex-shrink-0">
                        <span className="text-[10px] sm:text-xs text-muted-foreground mr-2 hidden sm:inline">{t('settings.required')}</span>
                        <div className="w-9 h-5 sm:w-10 sm:h-6 bg-primary rounded-full flex items-center justify-end px-1">
                          <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Analytics Cookies */}
                    <div className="flex items-start justify-between p-3 sm:p-4 rounded-lg bg-muted/50 gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-xs sm:text-sm">{t('settings.analytics.title')}</h4>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                          {t('settings.analytics.description')}
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                        className={`w-9 h-5 sm:w-10 sm:h-6 rounded-full flex items-center px-1 transition-colors flex-shrink-0 ${
                          preferences.analytics ? 'bg-primary justify-end' : 'bg-muted-foreground/30 justify-start'
                        }`}
                      >
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow" />
                      </button>
                    </div>
                    
                    {/* Marketing Cookies */}
                    <div className="flex items-start justify-between p-3 sm:p-4 rounded-lg bg-muted/50 gap-3">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-xs sm:text-sm">{t('settings.marketing.title')}</h4>
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                          {t('settings.marketing.description')}
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                        className={`w-9 h-5 sm:w-10 sm:h-6 rounded-full flex items-center px-1 transition-colors flex-shrink-0 ${
                          preferences.marketing ? 'bg-primary justify-end' : 'bg-muted-foreground/30 justify-start'
                        }`}
                      >
                        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full shadow" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={rejectAll} className="w-full sm:w-auto text-xs sm:text-sm">
                      {t('rejectAll')}
                    </Button>
                    <Button size="sm" onClick={saveCustom} className="w-full sm:w-auto text-xs sm:text-sm bg-primary hover:bg-primary/90">
                      {t('savePreferences')}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}
