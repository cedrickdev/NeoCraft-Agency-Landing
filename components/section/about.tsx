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
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="sticky top-32"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full border-primary/10 bg-primary/5 text-primary/80 font-medium whitespace-nowrap">
                  {t("badge")}
                </Badge>
              </motion.div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight tracking-tighter">
                {t("h2")}
              </h2>
              <div className="space-y-8 max-w-lg">
                {[
                  { title: t("element1.title"), desc: t("element1.description") },
                  { title: t("element2.title"), desc: t("element2.description") }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 + (i * 0.2) }}
                    viewport={{ once: true }}
                    className="relative pl-8 border-l-2 border-primary/10 hover:border-primary/40 transition-colors duration-500"
                  >
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid sm:grid-cols-2 gap-6"
            >
              {/* Manifest Card */}
              <motion.div 
                variants={itemVariants}
                className="col-span-full glass-card p-10 rounded-3xl mb-4 group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors duration-500 rounded-full" />
                <div className="flex flex-col gap-6 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:rotate-12">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold tracking-tight mb-4">
                      {t("card.title")}
                    </h3>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                      {t("card.description")}
                    </p>
                  </div>
                </div>
              </motion.div>

              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="glass-card p-8 rounded-3xl group hover:border-primary/20 transition-all duration-500"
                  whileHover={{ y: -8 }}
                >
                  <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold mb-3">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/[0.03] blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}

