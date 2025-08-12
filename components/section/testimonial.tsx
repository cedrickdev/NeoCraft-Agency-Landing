import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import {useTranslations} from "next-intl";

function Testimonial() {
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
  return <AnimatedTestimonials testimonials={testimonials} />;
}

export { Testimonial };
