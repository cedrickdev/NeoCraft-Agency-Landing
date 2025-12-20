"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function Testimonial() {
  const t = useTranslations('Testimonial');
  const testimonials = [
    {
      quote: t('testimonial1.quote'),
      name: "Sarah Chen",
      designation: t('testimonial1.designation'),
      src: "https://media.istockphoto.com/id/1705503967/fr/photo/femme-daffaires-confiante-dans-un-bureau-moderne.webp?a=1&b=1&s=612x612&w=0&k=20&c=5LkpRbeIzwGHVEmJmd8pa_6kzrLt-GE5dtB9vXdRZTk=",
    },
    {
      quote: t('testimonial2.quote'),
      name: "Michael Rodriguez",
      designation: t('testimonial2.designation'),
      src: "https://images.unsplash.com/photo-1589386417686-0d34b5903d23?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fHBlb3BsZSUyMGF0JTIwd29ya3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      quote: t('testimonial3.quote'),
      name: "Natalie Iwara",
      designation: t('testimonial3.designation'),
      src: "https://images.unsplash.com/photo-1592520112754-6d74d747ef89?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA4fHxibGFjayUyMGdpcmxzJTIwYXQlMjB3b3JrfGVufDB8fDB8fHww",
    },
    {
      quote: t('testimonial4.quote'),
      name: "James Kombou",
      designation: t('testimonial4.designation'),
      src: "https://plus.unsplash.com/premium_photo-1663040154843-8663ecb1f007?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmxhY2slMjBwZW9wbGUlMjBhdCUyMHdvcmt8ZW58MHx8MHx8fDA%3D",
    },
    {
      quote: t('testimonial5.quote'),
      name: "Lisa Thompson",
      designation: t('testimonial5.designation'),
      src: "https://plus.unsplash.com/premium_photo-1666299357105-f82402c04826?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzgxfHxwZW9wbGUlMjBhdCUyMHdvcmt8ZW58MHx8MHx8fDA%3D",
    },
  ];

  return (
    <section id="testimonials" className="py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-6 px-4 py-1.5 rounded-full border-primary/10 bg-primary/5 text-primary/80 font-medium">
              Expertise & Impact
            </Badge>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Testimonials
            </h2>
          </motion.div>
        </div>
        
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </section>
  );
}
