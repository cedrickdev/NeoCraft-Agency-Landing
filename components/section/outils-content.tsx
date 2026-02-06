"use client"

import { Button } from "@/components/ui/button"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"
import { Particles } from "@/components/ui/particles"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"

// Icons organized by category
const techStack = {
  // Ring 1: Frontend
  frontend: [
    { name: "vuejs", label: "Vue.js" },
    { name: "nuxtjs", label: "Nuxt.js" },
    { name: "pinia", label: "Pinia" },
    { name: "nextjs", label: "Next.js" },
    { name: "tailwindcss", label: "Tailwind CSS" },
  ],
  // Ring 2: Backend & Mobile
  backend: [
    { name: "laravel", label: "Laravel" },
    { name: "spring", label: "Spring" },
    { name: "wordpress", label: "WordPress" },
    { name: "flutter", label: "Flutter" },
  ],
  // Ring 3: Database & BaaS
  database: [
    { name: "firebase", label: "Firebase" },
    { name: "supabase", label: "Supabase" },
    { name: "postgresql", label: "PostgreSQL" },
    { name: "mongodb", label: "MongoDB" },
  ],
  // Ring 4: DevOps & Testing
  devops: [
    { name: "docker", label: "Docker" },
    { name: "jenkins", label: "Jenkins" },
    { name: "git", label: "Git" },
    { name: "postman", label: "Postman" },
    { name: "swagger", label: "Swagger" },
    { name: "playwright", label: "Playwright" },
  ],
  // Ring 5: Design & Collaboration
  design: [
    { name: "figma", label: "Figma" },
    { name: "canva", label: "Canva" },
    { name: "xd", label: "Adobe XD" },
    { name: "indesign", label: "InDesign" },
    { name: "slack", label: "Slack" },
    { name: "atlassian", label: "Atlassian" },
  ],
}

export function OutilsContent() {
  const t = useTranslations('Outils')
  const { resolvedTheme } = useTheme()

  return (
    <TooltipProvider delayDuration={100}>
      <div className="relative min-h-screen overflow-hidden">
        {/* Particles Background */}
        <Particles
          className="absolute inset-0 -z-10"
          quantity={80}
          staticity={30}
          ease={80}
          size={0.5}
          color={resolvedTheme === "dark" ? "#ffffff" : "#000000"}
        />
        
        <div className="container mx-auto px-4 max-w-7xl relative py-20 flex flex-col items-center">
          {/* Back Button */}
          <div className="w-full mb-12 flex justify-start">
            <Button variant="ghost" asChild className="group text-muted-foreground hover:text-primary transition-colors">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Home</span>
              </Link>
            </Button>
          </div>

          {/* Title & Description */}
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

          {/* ORBITING TECH SYSTEM */}
          <div className="relative w-full aspect-square max-w-[650px] flex items-center justify-center -mt-10 scale-[0.75] md:scale-100">
            
            {/* CENTER CORE */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="z-50 size-20 md:size-24 rounded-full bg-background/80 backdrop-blur-xl border border-primary/20 flex items-center justify-center shadow-[0_0_60px_rgba(var(--primary),0.15)]"
            >
              <Image 
                src="/logo/logo.png" 
                alt="Neocraft" 
                width={80} 
                height={80}
                className="size-14 md:size-18 object-contain"
              />
            </motion.div>

            {/* RING 1: Frontend */}
            {techStack.frontend.map((item, i) => (
              <OrbitingCircles 
                key={`frontend-${item.name}`}
                radius={70} 
                duration={20} 
                delay={(20 / techStack.frontend.length) * i}
                className="size-9 border-none bg-transparent"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="size-9 flex items-center justify-center transition-transform hover:scale-125 cursor-help">
                      <Image 
                        src={`/icons/${item.name}.svg`} 
                        alt={item.label} 
                        width={36} 
                        height={36}
                        className="w-full h-full object-contain drop-shadow-md"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-background/90 backdrop-blur-md border-primary/20 font-bold">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </OrbitingCircles>
            ))}

            {/* RING 2: Backend & Mobile */}
            {techStack.backend.map((item, i) => (
              <OrbitingCircles 
                key={`backend-${item.name}`}
                radius={125} 
                duration={28} 
                delay={(28 / techStack.backend.length) * i}
                reverse 
                className="size-10 border-none bg-transparent"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="size-10 flex items-center justify-center transition-transform hover:scale-125 cursor-help">
                      <Image 
                        src={`/icons/${item.name}.svg`} 
                        alt={item.label} 
                        width={40} 
                        height={40}
                        className="w-full h-full object-contain drop-shadow-md"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-background/90 backdrop-blur-md border-primary/20 font-bold">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </OrbitingCircles>
            ))}

            {/* RING 3: Database & BaaS */}
            {techStack.database.map((item, i) => (
              <OrbitingCircles 
                key={`database-${item.name}`}
                radius={180} 
                duration={36} 
                delay={(36 / techStack.database.length) * i}
                className="size-11 border-none bg-transparent"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="size-11 flex items-center justify-center transition-transform hover:scale-125 cursor-help">
                      <Image 
                        src={`/icons/${item.name}.svg`} 
                        alt={item.label} 
                        width={44} 
                        height={44}
                        className="w-full h-full object-contain drop-shadow-md"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-background/90 backdrop-blur-md border-primary/20 font-bold">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </OrbitingCircles>
            ))}

            {/* RING 4: DevOps & Testing */}
            {techStack.devops.map((item, i) => (
              <OrbitingCircles 
                key={`devops-${item.name}`}
                radius={240} 
                duration={48} 
                delay={(48 / techStack.devops.length) * i}
                reverse 
                className="size-11 border-none bg-transparent"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="size-11 flex items-center justify-center transition-transform hover:scale-125 cursor-help">
                      <Image 
                        src={`/icons/${item.name}.svg`} 
                        alt={item.label} 
                        width={44} 
                        height={44}
                        className="w-full h-full object-contain drop-shadow-md"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-background/90 backdrop-blur-md border-primary/20 font-bold">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </OrbitingCircles>
            ))}

            {/* RING 5: Design & Collaboration */}
            {techStack.design.map((item, i) => (
              <OrbitingCircles 
                key={`design-${item.name}`}
                radius={305} 
                duration={60} 
                delay={(60 / techStack.design.length) * i}
                className="size-12 border-none bg-transparent"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="size-12 flex items-center justify-center transition-transform hover:scale-125 cursor-help">
                      <Image 
                        src={`/icons/${item.name}.svg`} 
                        alt={item.label} 
                        width={48} 
                        height={48}
                        className="w-full h-full object-contain drop-shadow-md"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-background/90 backdrop-blur-md border-primary/20 font-bold">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </OrbitingCircles>
            ))}

            {/* Decorative glow */}
            <div className="absolute inset-0 bg-primary/[0.02] blur-[100px] rounded-full -z-10 animate-slow-float" />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 w-full mt-20">
            {[
              { label: "Frontend", desc: "Vue, Nuxt, Next.js, Tailwind, Pinia" },
              { label: "Backend", desc: "Laravel, Spring, WordPress, Flutter" },
              { label: "Database", desc: "Firebase, Supabase, PostgreSQL, MongoDB" },
              { label: "DevOps", desc: "Docker, Jenkins, Git, Postman, Swagger" },
              { label: "Design", desc: "Figma, Canva, XD, InDesign, Slack" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                className="p-5 glass-card rounded-[2rem] border-primary/5 text-center group hover:border-primary/20 transition-all font-black"
              >
                <h4 className="text-primary font-black uppercase tracking-widest text-[10px] mb-2">{item.label}</h4>
                <p className="text-muted-foreground font-bold text-xs tracking-tight">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
