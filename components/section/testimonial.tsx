import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marie Dupont",
    role: "CEO",
    company: "TechStart",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "NeoCraft a transformé notre vision en une application exceptionnelle. Leur approche artisanale et leur attention aux détails ont fait toute la différence. Un partenaire de confiance pour l'avenir.",
    rating: 5,
  },
  {
    name: "Pierre Moreau",
    role: "CTO",
    company: "InnovateCorp",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Une équipe passionnée qui livre des solutions de qualité. Leur expertise technique et leur capacité à comprendre nos enjeux métier nous ont permis d'accélérer notre transformation digitale.",
    rating: 5,
  },
  {
    name: "Julie Bernard",
    role: "Head of Product",
    company: "StartupLab",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "Formation technique de haut niveau qui a transformé notre équipe. Nos développeurs ont gagné en autonomie et en efficacité grâce à l'approche pédagogique de NeoCraft.",
    rating: 5,
  },
];

export default function Testimonial() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-emerald-500">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 mix-blend-soft-light"></div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-amber-600 text-white  dark:bg-amber-900/20 dark:text-amber-400 border-amber-100 dark:border-amber-800/30 px-4 py-1.5 text-sm font-medium">
            Témoignages
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold  text-gray-900 dark:text-white mb-6">
            Ce que nos clients disent
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez les retours d'expérience de nos clients satisfaits et
            comment nous avons transformé leurs projets.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 md:p-12"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-8">
                    <div className="md:w-1/3 flex flex-col items-center text-center">
                      <div className="relative mb-4">
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800">
                          <img
                            src={
                              testimonials[activeTestimonial].avatar ||
                              "/placeholder.svg"
                            }
                            alt={testimonials[activeTestimonial].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-blue-600 to-emerald-500 rounded-full p-1">
                          <Quote className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {testimonials[activeTestimonial].name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">
                        {testimonials[activeTestimonial].role}
                      </p>
                      <p className="text-blue-600 dark:text-blue-400 font-medium">
                        {testimonials[activeTestimonial].company}
                      </p>
                    </div>

                    <div className="md:w-2/3">
                      <div className="flex mb-6">
                        {[...Array(testimonials[activeTestimonial].rating)].map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-yellow-400 fill-current"
                            />
                          )
                        )}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-lg italic leading-relaxed mb-6">
                        "{testimonials[activeTestimonial].content}"
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === index
                      ? "bg-slate-500 dark:bg-white scale-125"
                      : "bg-slate-300 dark:bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Voir le témoignage ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
