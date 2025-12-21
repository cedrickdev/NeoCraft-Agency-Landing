"use client"

import { cn } from "@/lib/utils"
import { animate, motion } from "framer-motion"
import React, { useEffect } from "react"

export interface AnimatedCardProps {
  className?: string
  title?: React.ReactNode
  description?: React.ReactNode
  icons?: Array<{
    icon: React.ReactNode
    size?: "sm" | "md" | "lg"
    className?: string
  }>
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
}

export function AnimatedCard({ className, title, description, icons = [] }: AnimatedCardProps) {
  return (
    <div
      className={cn(
        "max-w-sm w-full mx-auto p-8 rounded-3xl border border-primary/5 dark:bg-card/40 bg-zinc-50/50 backdrop-blur-xl shadow-2xl transition-all duration-500 group hover:border-primary/20",
        className
      )}
    >
      <div
        className={cn(
          "h-[15rem] md:h-[20rem] rounded-2xl z-40 overflow-hidden relative",
          "bg-gradient-to-br from-primary/5 via-transparent to-primary/5 [mask-image:radial-gradient(50%_50%_at_50%_50%,white_0%,transparent_100%)]"
        )}
      >
        <AnimatedIcons icons={icons} />
      </div>
      <div className="mt-6">
        {title && (
          <h3 className="text-xl font-black text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-sm font-medium text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

function AnimatedIcons({ icons = [] }: { icons: AnimatedCardProps["icons"] }) {
  const scale = [1, 1.1, 1]
  const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"]
  
  const sequence = icons.map((_, index) => [
    `.circle-${index + 1}`,
    { scale, transform },
    { duration: 0.8 },
  ])

  useEffect(() => {
    // @ts-ignore
    animate(sequence as any, {
      repeat: Infinity,
      repeatDelay: 1,
    })
  }, [])

  return (
    <div className="p-8 overflow-hidden h-full relative flex items-center justify-center">
      <div className="flex flex-row flex-shrink-0 justify-center items-center gap-4">
        {icons.map((icon, index) => (
          <Container
            key={index}
            className={cn(
              sizeMap[icon.size || "lg"],
              `circle-${index + 1}`,
              icon.className
            )}
          >
            {icon.icon}
          </Container>
        ))}
      </div>
      <AnimatedSparkles />
    </div>
  )
}

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      `rounded-2xl flex items-center justify-center bg-background/50 backdrop-blur-md
      shadow-[0px_0px_8px_0px_rgba(248,248,248,0.05)_inset,0px_16px_24px_-8px_rgba(0,0,0,0.1)] border border-primary/5`,
      className
    )}
    {...props}
  />
))
Container.displayName = "Container"

const AnimatedSparkles = () => (
  <div className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-primary/50 to-transparent animate-move">
    <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
      <Sparkles />
    </div>
  </div>
)

const Sparkles = () => {
  const randomMove = () => Math.random() * 2 - 1
  const randomOpacity = () => Math.random()
  const random = () => Math.random()

  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 2 + 4,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block bg-primary"
        />
      ))}
    </div>
  )
}
