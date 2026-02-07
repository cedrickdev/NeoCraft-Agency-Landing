"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Facebook, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

type SocialLinks = {
  twitter?: string;
  linkedin?: string;
  github?: string;
  facebook?: string;
};

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
  facebook: Facebook,
};

export default function TeamContent() {
  const t = useTranslations('Team');

  const team = [
    {
      name: "Cédrick Tchinda",
      role: t("cedrick.role"),
      bio: t("cedrick.bio"),
      image: "/team/cedrick.webp",
      social: {
        twitter: "https://x.com/fezz4real",
        linkedin: "https://www.linkedin.com/in/cedrick-feze",
        github: "https://github.com/cedrickdev",
      } as SocialLinks
    },
    {
      name: "Marine Mamgue",
      role: t("mj.role"),
      bio: t("mj.bio"),
      image: "/team/mj.webp",
      social: {
        facebook: "https://www.facebook.com/profile.php?id=61557157384910",
      } as SocialLinks
    },
    {
      name: "Jorel Kue",
      role: t("jorel.role"),
      bio: t("jorel.bio"),
      image: "/team/jorel.webp",
      social: {
        linkedin: "https://www.linkedin.com/in/jorel-kue-5a7961262/",
        github: "https://github.com/Bassogog",
      } as SocialLinks
    },
    {
      name: "Stephane Kamga",
      role: t("stephane.role"),
      bio: t("stephane.bio"),
      image: "/team/stephane.webp",
      social: {
        linkedin: "https://www.linkedin.com/in/stephkamga",
        twitter: "https://x.com/kamgasteph32994?s=21",
        github: "https://github.com/stephanekamga",
      } as SocialLinks
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <div className="pt-32 pb-20 overflow-hidden min-h-screen">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-7xl mx-auto mb-12"
        >
          <Button variant="ghost" asChild className="group text-muted-foreground hover:text-primary transition-colors">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>{t('backToHome')}</span>
            </Link>
          </Button>
        </motion.div>

        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full border-primary/10 bg-primary/5 text-primary/80 font-medium">
              {t('badge')}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
              {t('title')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t('description')}
            </p>
          </motion.div>
        </div>

        {/* Team Grid - 4 columns */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-6 glass-card border-primary/10 transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-2xl group-hover:shadow-primary/5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                  priority={index < 4}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Social Links on Hover - only existing ones */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {Object.entries(member.social).map(([platform, url]) => {
                    const Icon = socialIcons[platform];
                    if (!Icon || !url) return null;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl font-bold mb-1 tracking-tight">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-bold uppercase tracking-widest mb-4">
                  {member.role}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {member.bio}
                </p>
              </div>

              {/* Decorative Glow */}
              <div className="absolute inset-0 -z-10 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Join the Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-7xl mx-auto mt-10"
        >
          <div className="rounded-[2.5rem] border border-primary/10 bg-primary/[0.02] p-12 sm:p-16 relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
            {/* Animated gradient bg */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.07] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.05] rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3 animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-3">
                  {t("cta.title")}
                </h2>
                <p className="text-muted-foreground leading-relaxed max-w-lg text-lg">
                  {t("cta.description")}
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 py-6 text-base group/btn shrink-0"
              >
                <a
                  href="mailto:careers@neocraft.dev"
                  className="flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  <span>{t("cta.button")}</span>
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
