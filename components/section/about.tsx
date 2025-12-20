"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Shield, Sparkles, Users, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations('About');

  const values = [
    {
      icon: Shield,
      title: t("value1.title"),
      description: t("value1.description"),
    },
    {
      icon: Users,
      title: t("value2.title"),
      description: t("value2.description"),
    },
    {
      icon: Zap,
      title: t("value3.title"),
      description: t("value3.description"),
    },
    {
      icon: Sparkles,
      title: t("value4.title"),
      description: t("value4.description"),
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
    hidden: { opacity: 0, y: 40, scale: 0.95, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      },
    },
  };

  return (
    <section id="about" className="py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full border-primary/10 bg-primary/5 text-primary/80 font-medium whitespace-nowrap">
                {t("badge")}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                {t("h2")}
              </h2>
              <div className="space-y-8 max-w-lg">
                <div className="relative pl-8 border-l border-primary/10">
                  <h3 className="text-xl font-semibold mb-3">{t("element1.title")}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("element1.description")}
                  </p>
                </div>
                <div className="relative pl-8 border-l border-primary/10">
                  <h3 className="text-xl font-semibold mb-3">{t("element2.title")}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("element2.description")}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 gap-6"
            >
              {/* Manifest Card */}
              <motion.div 
                variants={itemVariants}
                className="col-span-full glass-card p-10 rounded-3xl mb-4 group"
              >
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight">
                    {t("card.title")}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {t("card.description")}
                  </p>
                </div>
              </motion.div>

              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass-card p-8 rounded-3xl group hover:border-primary/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <value.icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold mb-3">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}

