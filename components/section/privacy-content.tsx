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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
              <span>Back to Home</span>
            </Link>
          </Button>
        </motion.div>

        {/* Header Section */}
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

        {/* Main Content Sections */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="glass-card p-8 md:p-12 rounded-[2.5rem] border-primary/10 hover:border-primary/20 transition-all duration-500"
            >
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                    <section.icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold mb-6 tracking-tight">{section.title}</h2>
                  {section.content && (
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {section.highlight && <span className="text-primary font-bold block mb-2">{section.highlight}</span>}
                      {section.content}
                    </p>
                  )}
                  
                  {section.items && (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {section.items.map((item, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-primary/5 border border-primary/5">
                          <p className="font-bold text-sm mb-1">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.grid && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {section.grid.map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/5 hover:bg-primary/10 transition-colors">
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

          {/* Contact Box */}
          <motion.div
            variants={itemVariants}
            className="p-1 rounded-[3rem] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent mt-20"
          >
            <div className="bg-card p-10 md:p-16 rounded-[2.9rem] text-center">
              <div className="w-20 h-20 rounded-3xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/20">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-6">{t('rights.title')}</h2>
              <p className="text-muted-foreground mb-10 max-w-md mx-auto">
                {t('rights.how')}
              </p>
              <Button asChild size="lg" className="rounded-2xl h-14 px-10 font-bold">
                <a href="mailto:privacy@neocraft.dev">Get in Touch</a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
