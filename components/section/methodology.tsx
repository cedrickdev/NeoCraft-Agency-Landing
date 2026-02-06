"use client";

import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { CheckCircle, Code2, Lightbulb, Search, TestTube } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Methodology() {
  const t = useTranslations('Methodology');

  const methodology = [
    {
      icon: Search,
      title: t("step1.title"),
      description: t("step1.description"),
    },
    {
      icon: Lightbulb,
      title: t("step2.title"),
      description: t("step2.description"),
    },
    {
      icon: Code2,
      title: t("step3.title"),
      description: t("step3.description"),
    },
    {
      icon: TestTube,
      title: t("step4.title"),
      description: t("step4.description"),
    },
    {
      icon: CheckCircle,
      title: t("step5.title"),
      description: t("step5.description"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30, scale: 0.98 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="methodology" className="py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full border-primary/10 bg-primary/5 text-primary/80 font-medium">
              {t("badge")}
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              {t("title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t("description")}
            </p>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-4"
          >
            {methodology.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="glass-card p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 md:items-center transition-all duration-500 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5">
                  <div className="flex-shrink-0 flex items-center gap-6">
                    <span className="text-4xl font-black text-primary/5 tabular-nums transition-colors group-hover:text-primary/10">
                      0{index + 1}
                    </span>
                    <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                      <step.icon className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                  </div>

                  {index < methodology.length - 1 && (
                    <div className="hidden md:block absolute -bottom-4 left-32 w-px h-8 bg-gradient-to-b from-primary/10 to-transparent" />
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Background Decorative Blur */}
      <div className="hidden md:block absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}

