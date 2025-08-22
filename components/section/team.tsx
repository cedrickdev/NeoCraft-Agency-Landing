import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const team = [
  {
    name: "Jorel KUE ",
    role: "Lead Developer, Open Source Contributor",
    avatar: "/IMG_9554.jpg?height=400&width=400",
    bio: "Expert en React/Next.js avec 8 ans d'expérience dans le développement d'applications web complexes.",
    skills: ["React", "Next.js", "Node.js", "TypeScript"],
  },
  {
    name: "Cédrick FEZE",
    role: "Back End Developer, Product Owner",
    avatar: "/IMG_9221.jpg?height=400&width=400",
    bio: "Créatrice d'expériences digitales mémorables avec une approche centrée sur l'utilisateur.",
    skills: ["Figma", "UX Research", "Design System", "Prototyping"],
  },
  {
    name: "Stéphane KAMGA",
    role: "Mobile Developer, User Experience Designer, Content Strategist",
    avatar: "/IMG_9553.jpg?height=400&width=400",
    bio: "Architecte de solutions techniques innovantes qui transforment les défis en opportunités.",
    skills: ["Architecture", "Cloud", "DevOps", "Performance"],
  },
];

export default function Team() {
  return (
    <section id="team" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white dark:bg-gray-950"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400 border-amber-100 dark:border-amber-800/30 px-4 py-1.5 text-sm font-medium hover:text-white">
            Notre équipe
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Des collaborateurs passionnés et engagés
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mb-8 rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-10">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 h-full">
                <div className="relative">
                  <div className="aspect-[3/2] bg-gradient-to-br from-blue-600 to-emerald-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px] opacity-30 mix-blend-soft-light"></div>
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <Image
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
                </div>

                <div className="p-8 pt-4 text-center">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
