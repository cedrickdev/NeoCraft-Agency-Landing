"use client";

import { Badge } from "@/components/ui/badge";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Code2,
  GraduationCap,
  Palette,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef, type MouseEvent, type ReactNode } from "react";

// Magnetic hover effect
function MagneticCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
    stiffness: 200,
    damping: 20,
  });
  const brightness = useTransform(
    [springX, springY],
    ([latestX, latestY]: number[]) => {
      const dist = Math.sqrt(latestX * latestX + latestY * latestY);
      return 1 + dist * 0.15;
    }
  );

  function handleMouse(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        filter: useTransform(brightness, (v) => `brightness(${v})`),
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Services() {
  const t = useTranslations("Services");

  const services = [
    {
      icon: Code2,
      title: t("card1.title"),
      description: t("card1.description"),
    },
    {
      icon: Palette,
      title: t("card2.title"),
      description: t("card2.description"),
    },
    {
      icon: GraduationCap,
      title: t("card3.title"),
      description: t("card3.description"),
    },
    {
      icon: Users,
      title: t("card4.title"),
      description: t("card4.description"),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="services"
      className="py-32 relative overflow-hidden bg-background"
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className="mb-6 px-4 py-1.5 rounded-full border-primary/10 bg-primary/5 text-primary/80 font-medium"
            >
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

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-6 gap-5 max-w-6xl mx-auto"
        >
          {/* Card 1 - Dev Web - Large (spans 4) */}
          <motion.div
            variants={itemVariants}
            className="group relative md:col-span-4 h-full"
          >
            <MagneticCard className="h-full perspective-[1000px]">
              <div className="h-full rounded-2xl border border-primary/5 bg-primary/[0.02] p-10 md:p-12 transition-all duration-500 hover:border-primary/20 relative overflow-hidden">
                {/* Gradient blob */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Accent line */}
                <div className="absolute top-0 left-10 w-12 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-20" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                  <div className="flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
                    >
                      <Code2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                      {services[0].title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg max-w-md">
                      {services[0].description}
                    </p>
                  </div>

                  {/* Decorative code block */}
                  <div className="hidden md:block w-48 h-32 rounded-xl bg-foreground/[0.03] border border-primary/5 p-4 font-mono text-xs text-muted-foreground/50 overflow-hidden group-hover:border-primary/10 transition-colors">
                    <div className="space-y-1.5">
                      <div className="flex gap-1.5 mb-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
                      </div>
                      <div className="text-primary/60">{"const"} <span className="text-foreground/40">app</span> = </div>
                      <div className="pl-2 text-primary/40">{"  createApp"}({"{"}</div>
                      <div className="pl-4 text-foreground/30">{"    framework: 'next'"}</div>
                      <div className="pl-2 text-emerald-400/60">{"})"}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors cursor-pointer mt-8 relative z-10">
                  <span>{t("learnMore")}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </MagneticCard>
          </motion.div>

          {/* Card 2 - UI/UX - Small (spans 2) */}
          <motion.div
            variants={itemVariants}
            className="group relative md:col-span-2 h-full"
          >
            <MagneticCard className="h-full perspective-[1000px]">
              <div className="h-full rounded-2xl border border-primary/5 bg-primary/[0.02] p-10 transition-all duration-500 hover:border-primary/20 relative overflow-hidden">
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-0 left-10 w-12 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-16" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
                  >
                    <Palette className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">
                    {services[1].title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {services[1].description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors cursor-pointer mt-6">
                    <span>{t("learnMore")}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </MagneticCard>
          </motion.div>

          {/* Card 3 - Formation - Small (spans 2) */}
          <motion.div
            variants={itemVariants}
            className="group relative md:col-span-2 h-full"
          >
            <MagneticCard className="h-full perspective-[1000px]">
              <div className="h-full rounded-2xl border border-primary/5 bg-primary/[0.02] p-10 transition-all duration-500 hover:border-primary/20 relative overflow-hidden">
                <div className="absolute -top-16 -left-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-0 left-10 w-12 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-16" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
                  >
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 tracking-tight">
                    {services[2].title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {services[2].description}
                  </p>

                  <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors cursor-pointer mt-6">
                    <span>{t("learnMore")}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </div>
            </MagneticCard>
          </motion.div>

          {/* Card 4 - Accompagnement - Large (spans 4) */}
          <motion.div
            variants={itemVariants}
            className="group relative md:col-span-4 h-full"
          >
            <MagneticCard className="h-full perspective-[1000px]">
              <div className="h-full rounded-2xl border border-primary/5 bg-primary/[0.02] p-10 md:p-12 transition-all duration-500 hover:border-primary/20 relative overflow-hidden">
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute top-0 left-10 w-12 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:w-20" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                  {/* Steps visualization */}
                  <div className="hidden md:flex flex-col gap-3 w-48 shrink-0">
                    {["Conception", "Design", "Dev", "Deploy"].map(
                      (step, i) => (
                        <div
                          key={step}
                          className="flex items-center gap-3 group-hover:translate-x-1 transition-transform"
                          style={{ transitionDelay: `${i * 75}ms` }}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg ${
                              i === 0
                                ? "bg-primary/20 text-primary"
                                : "bg-primary/5 text-muted-foreground/40"
                            } flex items-center justify-center text-xs font-bold group-hover:bg-primary/20 group-hover:text-primary transition-colors`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                          >
                            {i + 1}
                          </div>
                          <span className="text-sm text-muted-foreground/50 font-medium group-hover:text-muted-foreground transition-colors" style={{ transitionDelay: `${i * 100}ms` }}>
                            {step}
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 group-hover:rotate-6 group-hover:scale-110"
                    >
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight">
                      {services[3].title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg max-w-md">
                      {services[3].description}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors cursor-pointer mt-8">
                      <span>{t("learnMore")}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </div>
            </MagneticCard>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative center blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
}
