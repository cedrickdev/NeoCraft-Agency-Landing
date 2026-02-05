'use client';

import { Button } from '@/components/ui/button';
import { getCookie, setCookie } from 'cookies-next';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, Settings, Shield, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultPreferences: CookiePreferences = {
  necessary: true, // Always required
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
      // Delay showing banner for better UX
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
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sameSite: 'strict',
    });
    setPreferences(prefs);
    setShowBanner(false);
    setShowSettings(false);

    // Trigger analytics based on consent
    if (prefs.analytics && typeof window !== 'undefined') {
      // Enable Google Analytics
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted',
      });
      // Enable Clarity
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
        className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
      >
        <div className="mx-auto max-w-4xl">
          <div className="relative bg-background/95 backdrop-blur-xl border border-primary/10 rounded-2xl shadow-2xl overflow-hidden">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-primary" />
            
            <div className="p-6">
              {!showSettings ? (
                // Main Banner
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="flex-shrink-0 p-3 rounded-full bg-primary/10">
                    <Cookie className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg mb-1">{t('title')}</h3>
                    <p className="text-sm text-muted-foreground">
                      {t('description')}{' '}
                      <Link href="/privacy" className="text-primary hover:underline">
                        {t('learnMore')}
                      </Link>
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSettings(true)}
                      className="flex-1 md:flex-none"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      {t('customize')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={rejectAll}
                      className="flex-1 md:flex-none"
                    >
                      {t('rejectAll')}
                    </Button>
                    <Button
                      size="sm"
                      onClick={acceptAll}
                      className="flex-1 md:flex-none bg-primary hover:bg-primary/90"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      {t('acceptAll')}
                    </Button>
                  </div>
                </div>
              ) : (
                // Settings Panel
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      {t('settings.title')}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowSettings(false)}
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    {/* Necessary Cookies */}
                    <div className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <h4 className="font-semibold text-sm">{t('settings.necessary.title')}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t('settings.necessary.description')}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs text-muted-foreground mr-2">{t('settings.required')}</span>
                        <div className="w-10 h-6 bg-primary rounded-full flex items-center justify-end px-1">
                          <div className="w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Analytics Cookies */}
                    <div className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <h4 className="font-semibold text-sm">{t('settings.analytics.title')}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t('settings.analytics.description')}
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
                        className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                          preferences.analytics ? 'bg-primary justify-end' : 'bg-muted-foreground/30 justify-start'
                        }`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full shadow" />
                      </button>
                    </div>
                    
                    {/* Marketing Cookies */}
                    <div className="flex items-start justify-between p-4 rounded-lg bg-muted/50">
                      <div>
                        <h4 className="font-semibold text-sm">{t('settings.marketing.title')}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t('settings.marketing.description')}
                        </p>
                      </div>
                      <button
                        onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                        className={`w-10 h-6 rounded-full flex items-center px-1 transition-colors ${
                          preferences.marketing ? 'bg-primary justify-end' : 'bg-muted-foreground/30 justify-start'
                        }`}
                      >
                        <div className="w-4 h-4 bg-white rounded-full shadow" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" onClick={rejectAll}>
                      {t('rejectAll')}
                    </Button>
                    <Button size="sm" onClick={saveCustom} className="bg-primary hover:bg-primary/90">
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

// Extend Window interface for gtag and clarity
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}
