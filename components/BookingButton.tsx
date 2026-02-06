'use client';

import { Button } from '@/components/ui/button';
import Cal, { getCalApi } from '@calcom/embed-react';
import { Calendar } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

interface BookingButtonProps {
  calLink?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

// Cal.com booking link
const DEFAULT_CAL_LINK = 'neocraftdev/30min';

export default function BookingButton({
  calLink = DEFAULT_CAL_LINK,
  variant = 'default',
  size = 'default',
  className = '',
}: BookingButtonProps) {
  const t = useTranslations('Booking');

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'auto',
        styles: {
          branding: {
            brandColor: '#1a73e8',
          },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return (
    <>
      <Button
        data-cal-link={calLink}
        data-cal-config='{"layout":"month_view"}'
        variant={variant}
        size={size}
        className={className}
      >
        <Calendar className="w-4 h-4 mr-2" />
        {t('bookCall')}
      </Button>
      <Cal calLink={calLink} style={{ width: '100%', height: '100%', overflow: 'scroll' }} />
    </>
  );
}

// Floating booking button for the site
export function FloatingBookingButton() {
  const t = useTranslations('Booking');

  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', {
        theme: 'auto',
        styles: {
          branding: {
            brandColor: '#1a73e8',
          },
        },
      });
    })();
  }, []);

  return (
    <Button
      data-cal-link={DEFAULT_CAL_LINK}
      data-cal-config='{"layout":"month_view"}'
      size="lg"
      className="fixed bottom-24 right-6 z-40 rounded-full shadow-lg h-14 px-6 bg-primary hover:bg-primary/90"
    >
      <Calendar className="w-5 h-5 mr-2" />
      {t('bookCall')}
    </Button>
  );
}
