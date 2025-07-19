import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Mail, Phone, MessageCircleMore } from "lucide-react";
import { useState } from "react";

const contact = {
  email: "contact@neocraft.dev",
  phone: "+33 6 12 34 56 78",
  whatsApp: "https://wa.me/41783410631",
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setFormStatus("loading");
    const form = new FormData(e.target);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        subject: form.get("subject"), // Ajoute ceci
        message: form.get("message"),
      }),
      headers: { "Content-Type": "application/json" },
    });

    let isSuccess = res.ok;
    let errorData = null;
    if (!isSuccess) {
      errorData = await res.json();
      // Affiche errorData.message si besoin
    }
    setTimeout(() => {
      setFormStatus(isSuccess ? "success" : "error");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white dark:bg-gray-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] opacity-50 dark:opacity-20"></div>
        <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent"></div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 border-blue-100 dark:border-blue-800/30 px-4 py-1.5 text-sm font-medium hover:text-amber-100">
            Contactez-nous
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Parlez-nous de votre projet
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-emerald-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Dites-nous en plus sur vos idées, un de nos chefs de projet vous
            contactera rapidement. Nos offres sont sans engagement
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
              <div className="h-2 bg-gradient-to-r from-blue-600 to-emerald-500"></div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Envoyez-nous un message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nom *
                      </label>
                      <Input
                      name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email *
                      </label>
                      <Input
                      name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sujet *
                    </label>
                    <Input
                       name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg"
                      placeholder="Sujet de votre message"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                    name="message"
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full h-32 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 rounded-lg resize-none"
                      placeholder="Décrivez votre projet..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white py-3 text-lg rounded-lg shadow-lg shadow-blue-500/20 dark:shadow-emerald-500/20"
                  >
                    {formStatus === "loading" ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Envoi en cours...
                      </div>
                    ) : (
                      "Envoyer le message"
                    )}
                  </Button>

                  <AnimatePresence>
                    {formStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg"
                      >
                        <p className="text-emerald-800 dark:text-emerald-400 text-center flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Message envoyé avec succès ! Nous vous répondrons
                          rapidement.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-blue-600 to-emerald-500 rounded-3xl shadow-xl overflow-hidden text-white">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-6">
                  Informations de contact
                </h3>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <a href={`mailto:${contact.email}`}>Envoyez un mail</a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <a href={`tel:${contact.phone}`}>Appellez Nous</a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <MessageCircleMore className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <a href={`${contact.whatsApp}`}>
                        Ecrivez Nous sur whatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800">
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Prêt à commencer ?
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Discutons de votre projet et voyons comment nous pouvons vous
                  aider à le concrétiser avec notre expertise technique.
                </p>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white rounded-lg shadow-lg shadow-blue-500/20 dark:shadow-emerald-500/20">
                  Planifier un appel
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
