"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Database, Eye, Lock, Mail, Shield, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PrivacyContent() {
  const t = useTranslations('Privacy');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
  };

  const sections = [
    {
      icon: Eye,
      title: t('introduction.title'),
      content: t('introduction.content'),
    },
    {
      icon: Database,
      title: t('dataCollection.title'),
      content: t('dataCollection.content'),
      items: [
        { label: t('dataCollection.cookies'), desc: "Cookies, IP, Browser, Timezone" },
        { label: t('dataCollection.logs'), desc: "Log files, ISP, Entry/Exit pages" },
        { label: t('dataCollection.info'), desc: "Orders, Names, Payments, Contact info" }
      ]
    },
    {
      icon: Users,
      title: t('usage.title'),
      grid: [
        { label: t('usage.services'), icon: Shield },
        { label: t('usage.improvement'), icon: Database },
        { label: t('usage.marketing'), icon: Mail },
        { label: t('usage.legal'), icon: Lock }
      ]
    },
    {
      icon: Lock,
      title: t('protection.title'),
      content: t('protection.noSaleContent'),
      highlight: t('protection.noSale')
    },
    {
      icon: Shield,
      title: t('rights.title'),
      content: t('rights.content'),
      pills: [
        t('rights.access'),
        t('rights.rectification'),
        t('rights.erasure'),
        t('rights.portability')
      ]
    }
  ];

  return (
    <div className="pt-32 pb-20 relative">
      <div className="container max-w-4xl mx-auto px-4 relative z-10">
        {/* Back button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Button variant="ghost" asChild className="group text-muted-foreground hover:text-primary transition-colors">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{t('backToHome')}</span>
            </Link>
          </Button>
        </motion.div>

        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full border-primary/10 bg-primary/5 text-primary/80 font-medium">
              {t('badge')}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('description')}
            </p>
            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground/60 border-t border-primary/5 pt-8">
              <Shield className="w-4 h-4" />
              <span>{t('lastUpdated')}</span>
            </div>
          </motion.div>
        </div>

        {/* Sections */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group rounded-2xl border border-primary/5 bg-primary/[0.02] p-8 md:p-10 hover:border-primary/20 transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle hover glow */}
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="flex flex-col md:flex-row gap-6 relative z-10">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <section.icon className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-bold mb-4 tracking-tight">{section.title}</h2>
                  
                  {section.content && (
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {section.highlight && (
                        <span className="text-primary font-bold block mb-2">{section.highlight}</span>
                      )}
                      {section.content}
                    </p>
                  )}
                  
                  {section.items && (
                    <div className="grid sm:grid-cols-3 gap-3">
                      {section.items.map((item, i) => (
                        <div key={i} className="p-4 rounded-xl bg-primary/[0.03] border border-primary/5">
                          <p className="font-bold text-sm mb-1">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.grid && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {section.grid.map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-primary/[0.03] border border-primary/5 hover:bg-primary/5 transition-colors">
                          <item.icon className="w-5 h-5 text-primary/40" />
                          <p className="text-[10px] font-black uppercase tracking-widest text-center">{item.label}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.pills && (
                    <div className="flex flex-wrap gap-2">
                      {section.pills.map((pill, i) => (
                        <Badge key={i} variant="outline" className="bg-primary/5 hover:bg-primary/10 transition-colors cursor-default border-primary/10">
                          {pill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Contact CTA */}
          <motion.div
            variants={itemVariants}
            className="mt-16 rounded-2xl border border-primary/10 bg-primary/[0.02] p-10 md:p-14 relative overflow-hidden group hover:border-primary/20 transition-all duration-500"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/[0.05] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                <Mail className="w-7 h-7" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2 tracking-tight">{t('rights.title')}</h2>
                <p className="text-muted-foreground">
                  {t('rights.how')}
                </p>
              </div>
              <Button asChild size="lg" className="rounded-full px-8 shrink-0">
                <a href="mailto:privacy@neocraft.dev">{t('contactButton')}</a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
