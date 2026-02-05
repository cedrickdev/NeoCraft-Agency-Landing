'use client';

import { motion } from 'framer-motion';
import { Award, CheckCircle, Clock, Globe, HeadphonesIcon, Shield, Star, Users, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

// Client logos - Replace with actual client logos
const clientLogos = [
  { name: 'TechCorp', logo: '/images/placeholder.webp' },
  { name: 'InnovateCo', logo: '/images/placeholder.webp' },
  { name: 'StartupHub', logo: '/images/placeholder.webp' },
  { name: 'DigitalFirst', logo: '/images/placeholder.webp' },
  { name: 'CloudSys', logo: '/images/placeholder.webp' },
  { name: 'AppWorks', logo: '/images/placeholder.webp' },
];

const trustBadges = [
  {
    icon: Shield,
    titleKey: 'security',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: Clock,
    titleKey: 'delivery',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: HeadphonesIcon,
    titleKey: 'support',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: Award,
    titleKey: 'quality',
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
];

const stats = [
  { value: '50+', labelKey: 'projects' },
  { value: '98%', labelKey: 'satisfaction' },
  { value: '24/7', labelKey: 'availability' },
  { value: '5★', labelKey: 'rating' },
];

export default function TrustBadges() {
  const t = useTranslations('TrustBadges');

  return (
    <section className="py-16 bg-muted/30 border-y border-primary/5">
      <div className="container max-w-7xl mx-auto px-4">
        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {t(`stats.${stat.labelKey}`)}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 px-5 py-3 rounded-full bg-background border border-primary/10 shadow-sm"
            >
              <div className={`p-2 rounded-full ${badge.bg}`}>
                <badge.icon className={`w-4 h-4 ${badge.color}`} />
              </div>
              <span className="font-medium text-sm">{t(`badges.${badge.titleKey}`)}</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </motion.div>
          ))}
        </div>

        {/* Client Logos */}
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">
            {t('clientsTitle')}
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent z-10" />
          
          {/* Scrolling logos */}
          <motion.div
            className="flex gap-12 items-center"
            animate={{ x: [0, -600] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 20,
                ease: 'linear',
              },
            }}
          >
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-24 h-12 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 flex items-center justify-center"
              >
                <div className="w-full h-full bg-muted-foreground/20 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-muted-foreground">{client.name}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Guarantee Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-primary/5 border border-primary/10">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="font-bold text-lg">{t('guarantee.title')}</div>
              <div className="text-sm text-muted-foreground">{t('guarantee.description')}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
