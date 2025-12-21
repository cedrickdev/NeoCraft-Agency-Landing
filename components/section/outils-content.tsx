"use client"

import { Button } from "@/components/ui/button"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { motion } from "framer-motion"
import { ArrowLeft, Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"
// @ts-ignore - react-techs-logos might not have types
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ReactTechsLogos from 'react-techs-logos'

const ManualIcons = {
  java: () => (
    <svg viewBox="0 0 24 24" className="size-full p-1" fill="#ed8b00">
        <path d="M2.38 18c0 .22.18.4.4.4.22 0 .4-.18.4-.4s-.18-.4-.4-.4c-.22 0-.4.18-.4.4zm1.11-1.5c-1.1 0-2.1-.3-2.9-1-.8-.7-1.2-1.6-1.2-2.7 0-1.2.4-2.2 1.2-2.9.8-.7 1.8-1 2.9-1s2.1.3 2.9 1c.8.7 1.2 1.7 1.2 2.9 0 1.2-.4 2.2-1.2 2.9s-1.8 1-2.9 1zm13.1-4c-1.7 0-3.1-.6-4.2-1.8-1.1-1.2-1.7-2.7-1.7-4.5s.6-3.3 1.8-4.5c1.2-1.2 2.7-1.8 4.5-1.8s3.3.6 4.5 1.8c1.2 1.2 1.8 2.7 1.8 4.5s-.6 3.3-1.8 4.5c-1.1 1.2-2.7 1.8-4.5 1.8z"/>
    </svg>
  ),
  spring: () => (
    <svg viewBox="0 0 24 24" className="size-full p-1" fill="#6DB33F">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6c-5.302 0-9.6-4.298-9.6-9.6S6.698 2.4 12 2.4s9.6 4.298 9.6 9.6-4.298 9.6-9.6 9.6zm4.8-12h-2.4l.6-1.8h2.4L16.8 9.6zm-7.2 0H7.2l.6-1.8h2.4l-.6 1.8zm2.4 0h-2.4l.6-1.8h2.4l-.6 1.8z"/>
    </svg>
  ),
  laravel: () => (
    <svg viewBox="0 0 24 24" className="size-full p-1" fill="#FF2D20">
        <path d="M23.999 1.954V1h-.953l-5.714 5.714V5.76h-.953V4.807H14.47V3.855h-.952v-.953H9.71V1.95h-.953V1h-.953l-6.85 6.851-.954.954v4.572l.954-.954V8.805H2.1v-.953h.953V6.9h.952V5.947h.953V4.994h.953l12.37-12.37 1.905-1.905.952-.953h.953l.953.953v.953h.953v.952h.952l.953-.953v.953h-.953v.952H23V11.666l-.953.953h-.952l-9.52 9.522h-1.905v.952H8.761V24h.953v-.954h.953v-.953h.953v-.952h2.857l10.474-10.474.953-.954V2.907l-.955-.953z"/>
    </svg>
  ),
  keycloak: () => (
     <svg viewBox="0 0 24 24" className="size-full p-1" fill="#000000">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 6h2v6h-2zM11 14h2v2h-2z"/>
     </svg>
  )
}

export function OutilsContent() {
  const t = useTranslations('Outils');

  const techStack = {
    ring1: [
        { name: "typescript", type: "lib", label: "TypeScript" },
        { name: "javascript", type: "lib", label: "JavaScript" }
    ],
    ring2: [
        { name: "react", type: "lib", label: "React" },
        { name: "flutter", type: "lib", label: "Flutter" },
        { name: "python", type: "lib", label: "Python" }
    ],
    ring3: [
        { name: "laravel", type: "manual", label: "Laravel" },
        { name: "spring", type: "manual", label: "Spring Boot" },
        { name: "java", type: "manual", label: "Java" },
        { name: "php", type: "lib", label: "PHP" }
    ],
    ring4: [
        { name: "nextjs", type: "lib", label: "Next.js" },
        { name: "gitlab", type: "lib", label: "GitLab" },
        { name: "vercel", type: "lib", label: "Vercel" },
        { name: "keycloak", type: "manual", label: "Keycloak" }
    ]
  };

  const renderIcon = (item: { name: string; type: string; label: string }) => {
    if (item.type === "lib") {
        return <ReactTechsLogos name={item.name} hiddenLabel raw />;
    }
    const Icon = (ManualIcons as any)[item.name];
    return Icon ? <Icon /> : <Sparkles className="size-full text-primary/40 p-2" />;
  };

  return (
    <TooltipProvider delayDuration={100}>
      <div className="container mx-auto px-4 max-w-7xl relative min-h-screen py-20 flex flex-col items-center">
        {/* Bouton Retour */}
        <div className="w-full mb-12 flex justify-start">
          <Button variant="ghost" asChild className="group text-muted-foreground hover:text-primary transition-colors">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        {/* Titre & Description */}
        <div className="max-w-4xl text-center mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] uppercase tracking-[0.4em] font-black text-primary/40 mb-6 block">
              {t('badge')}
            </span>
            <h1 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter leading-none bg-gradient-to-b from-foreground to-foreground/40 bg-clip-text text-transparent italic">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground/80 leading-relaxed font-medium max-w-2xl mx-auto">
              {t('description')}
            </p>
          </motion.div>
        </div>

        {/* SYSTÈME SOLAIRE TECHNOLOGIQUE */}
        <div className="relative w-full aspect-square max-w-[500px] flex items-center justify-center -mt-20 scale-[0.9] md:scale-100">
          
          {/* NOYAU CENTRAL : NeoCraft Sun */}
          <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="z-50 size-14 md:size-20 rounded-full bg-primary/20 backdrop-blur-3xl border border-primary/30 flex items-center justify-center shadow-[0_0_80px_rgba(var(--primary),0.2)]"
          >
              <div className="size-10 md:size-14 bg-primary rounded-full flex items-center justify-center shadow-2xl">
                  <Sparkles className="size-4 md:size-6 text-primary-foreground animate-pulse" />
              </div>
          </motion.div>

          {/* RENDERING RINGS WITH TOOLTIPS */}
          {techStack.ring1.map((item, i) => (
            <OrbitingCircles 
              key={`r1-${item.name}`}
              radius={60} 
              duration={20} 
              delay={(20 / techStack.ring1.length) * i}
              className="size-10 border-none bg-transparent"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="size-10 flex items-center justify-center bg-background/80 backdrop-blur-md rounded-xl p-2 shadow-lg border border-primary/10 transition-transform hover:scale-125 cursor-help">
                      {renderIcon(item)}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-background/90 backdrop-blur-md border-primary/20 font-bold">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </OrbitingCircles>
          ))}

          {techStack.ring2.map((item, i) => (
            <OrbitingCircles 
              key={`r2-${item.name}`}
              radius={110} 
              duration={30} 
              delay={(30 / techStack.ring2.length) * i}
              reverse 
              className="size-12 border-none bg-transparent"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="size-12 flex items-center justify-center bg-background/80 backdrop-blur-md rounded-xl p-2 shadow-lg border border-primary/10 transition-transform hover:scale-125 cursor-help">
                      {renderIcon(item)}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-background/90 backdrop-blur-md border-primary/20 font-bold">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </OrbitingCircles>
          ))}

          {techStack.ring3.map((item, i) => (
            <OrbitingCircles 
              key={`r3-${item.name}`}
              radius={170} 
              duration={40} 
              delay={(40 / techStack.ring3.length) * i}
              className="size-14 border-none bg-transparent"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="size-14 flex items-center justify-center bg-background/80 backdrop-blur-md rounded-xl p-2 shadow-lg border border-primary/10 transition-transform hover:scale-125 cursor-help">
                      {renderIcon(item)}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-background/90 backdrop-blur-md border-primary/20 font-bold">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </OrbitingCircles>
          ))}

          {techStack.ring4.map((item, i) => (
            <OrbitingCircles 
              key={`r4-${item.name}`}
              radius={230} 
              duration={50} 
              delay={(50 / techStack.ring4.length) * i}
              reverse 
              className="size-14 border-none bg-transparent"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="size-14 flex items-center justify-center bg-background/80 backdrop-blur-md rounded-xl p-2 shadow-lg border border-primary/10 transition-transform hover:scale-125 cursor-help">
                      {renderIcon(item)}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-background/90 backdrop-blur-md border-primary/20 font-bold">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            </OrbitingCircles>
          ))}

          {/* Lueur galactique décorative */}
          <div className="absolute inset-0 bg-primary/[0.02] blur-[100px] rounded-full -z-10 animate-slow-float" />
        </div>

        {/* Légende / Résumé */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full mt-24">
           {[
             { label: "Frontend", desc: "React, Next.js, TS" },
             { label: "Backend", desc: "PHP, Python, Java" },
             { label: "Mobile", desc: "Flutter, React Native" },
             { label: "Security", desc: "Keycloak, GitLab CI" }
           ].map((item, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.5 + (i * 0.1) }}
               className="p-6 glass-card rounded-[2rem] border-primary/5 text-center group hover:border-primary/20 transition-all font-black"
             >
               <h4 className="text-primary font-black uppercase tracking-widest text-[10px] mb-2">{item.label}</h4>
               <p className="text-muted-foreground font-bold text-sm tracking-tight">{item.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </TooltipProvider>
  )
}
