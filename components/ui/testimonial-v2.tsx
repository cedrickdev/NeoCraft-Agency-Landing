"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from 'react';

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

interface TestimonialsColumnProps {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}

export const TestimonialsColumn = (props: TestimonialsColumnProps) => {
  return (
    <div className={cn("relative overflow-hidden", props.className)}>
      <motion.ul
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <motion.li 
                key={`${index}-${i}`}
                aria-hidden={index === 1 ? "true" : "false"}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  transition: { type: "spring", stiffness: 400, damping: 17 }
                }}
                className="p-8 rounded-[2rem] border border-primary/5 shadow-2xl shadow-primary/5 w-full bg-card/50 backdrop-blur-xl transition-all duration-300 cursor-default select-none group border-border/50 hover:border-primary/20" 
              >
                <blockquote className="m-0 p-0">
                  <p className="text-muted-foreground leading-relaxed font-medium m-0 text-sm italic">
                    &quot;{text}&quot;
                  </p>
                  <footer className="flex items-center gap-3 mt-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      width={44}
                      height={44}
                      src={image}
                      alt={`Avatar of ${name}`}
                      className="h-11 w-11 rounded-2xl object-cover ring-2 ring-primary/5 group-hover:ring-primary/20 transition-all duration-500 shadow-lg"
                    />
                    <div className="flex flex-col">
                      <cite className="font-black not-italic tracking-tight leading-5 text-foreground">
                        {name}
                      </cite>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-primary/60 mt-0.5">
                        {role}
                      </span>
                    </div>
                  </footer>
                </blockquote>
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
};
