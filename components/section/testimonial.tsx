"use client";

import { Badge } from "@/components/ui/badge";
import { TestimonialsColumn } from "@/components/ui/testimonial-v2";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Testimonial() {
  const t = useTranslations('Testimonial');
  
  const allTestimonials = [
    {
      name: "Sarah Chen",
      role: t('testimonial1.designation'),
      text: t('testimonial1.quote'),
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=60",
    },
    {
      name: "Michael Rodriguez",
      role: t('testimonial2.designation'),
      text: t('testimonial2.quote'),
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
    },
    {
      name: "Natalie Iwara",
      role: t('testimonial3.designation'),
      text: t('testimonial3.quote'),
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=60",
    },
    {
      name: "James Kombou",
      role: t('testimonial4.designation'),
      text: t('testimonial4.quote'),
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60",
    },
    {
      name: "Lisa Thompson",
      role: t('testimonial5.designation'),
      text: t('testimonial5.quote'),
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60",
    },
    {
      name: "Marc Dubuisson",
      role: t('testimonial6.designation'),
      text: t('testimonial6.quote'),
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60",
    },
    {
      name: "Amélie Leroy",
      role: t('testimonial7.designation'),
      text: t('testimonial7.quote'),
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60",
    },
    {
      name: "David Smith",
      role: t('testimonial8.designation'),
      text: t('testimonial8.quote'),
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60",
    },
    {
      name: "Sophie Bertrand",
      role: t('testimonial9.designation'),
      text: t('testimonial9.quote'),
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=60",
    },
  ];

  const firstColumn = allTestimonials.slice(0, 3);
  const secondColumn = allTestimonials.slice(3, 6);
  const thirdColumn = allTestimonials.slice(6, 9);

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full border-primary/10 bg-primary/5 text-primary/80 font-black tracking-widest uppercase text-[10px]">
              {t('badge')}
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
              {t('title')}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {t('description')}
            </p>
          </motion.div>
        </div>
        
        <div 
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[800px] overflow-hidden"
          role="region"
          aria-label="Scrolling Testimonials"
        >
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
        </div>
      </div>

      {/* Background decoration */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/[0.02] blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}
