"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, Github, Linkedin, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function TeamContent() {
  const t = useTranslations('Team');

  const team = [
    {
      name: "Marc",
      role: t("marc.role"),
      bio: t("marc.bio"),
      image: "/team/marc.png",
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Sophie",
      role: t("sophie.role"),
      bio: t("sophie.bio"),
      image: "/team/sophie.png",
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Thomas",
      role: t("thomas.role"),
      bio: t("thomas.bio"),
      image: "/team/thomas.png",
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Lucas",
      role: t("lucas.role"),
      bio: t("lucas.bio"),
      image: "/team/lucas.png",
      social: { twitter: "#", linkedin: "#", github: "#" }
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
              <span>Back to Home</span>
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

        {/* Team Grid */}
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
                
                {/* Social Links on Hover */}
                <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <a href={member.social.twitter} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href={member.social.linkedin} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={member.social.github} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
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
      </div>
    </div>
  );
}
