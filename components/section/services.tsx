"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  GraduationCap,
  Palette,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

export default function Services() {
  const t = useTranslations('Services');

  const services = [
    {
      icon: Code2,
      title: t('card1.title'),
      description: t('card1.description'),
    },
    {
      icon: Palette,
      title: t('card2.title'),
      description: t('card2.description'),
    },
    {
      icon: GraduationCap,
      title: t('card3.title'),
      description: t('card3.description'),
    },
    {
      icon: Users,
      title: t('card4.title'),
      description: t('card4.description'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9, rotateX: -5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full border-primary/10 bg-primary/5 text-primary/80 font-medium">
              {t('badge')}
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {t('title')}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t('description')}
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative h-full"
            >
              <div className="h-full glass-card p-10 rounded-3xl transition-all duration-500 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 group-hover:-translate-y-2">
                <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  <service.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold mb-4 tracking-tight">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors cursor-pointer mt-auto">
                  <span>{t('learnMore')}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
              
              {/* Subtle hover background effect */}
              <div className="absolute inset-0 -z-10 bg-primary/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative center blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
}

