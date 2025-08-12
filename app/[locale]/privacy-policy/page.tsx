"use client"

import {motion} from "framer-motion"
import {Database, Eye, Lock, Shield, Users} from "lucide-react"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/section/footer";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 mt-8">
            <Header/>

            <main className="container mx-auto px-6 py-12">
                {/* Hero Section */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.6}}
                    className="text-center mb-16"
                >
                    <div
                        className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-8 h-8 text-white"/>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r  from-blue-600  to-emerald-500 bg-clip-text text-transparent animate-gradien t">Politique
                        de Confidentialité</h1>
                    <p className="text-xl text-gray-600 mb-2 max-w-2xl mx-auto">
                        Nous nous engageons à protéger votre vie privée et vos données personnelles
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto"></div>
                    <p className="text-sm text-gray-500 mt-4">Dernière mise à jour : 15 Juillet 2025</p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {/* Introduction */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.1}}
                        className="mb-12"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Eye className="w-6 h-6 text-blue-500 mr-3"/>
                                    Introduction
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose prose-lg max-w-none">
                                <p>
                                    La présente Politique de Confidentialité décrit la façon dont neocraft
                                    collecte, utilise et protège vos informations lorsque vous utilisez notre site web
                                    et nos services. En
                                    utilisant nos services, vous acceptez les pratiques décrites dans cette politique.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Données collectées */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.2}}
                        className="mb-12"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Database className="w-6 h-6 text-blue-500 mr-3"/>
                                    Informations Personnelles que nous collectons
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <p className="text-gray-700">
                                    Lorsque vous visitez le Site, nous collectons automatiquement certaines informations
                                    sur votre appareil, notamment des informations sur votre navigateur Web, votre
                                    adresse IP, votre fuseau horaire et certains des cookies installés sur votre
                                    appareil. De plus, lorsque vous naviguez sur le Site, nous collectons des
                                    informations sur les pages Web ou les produits individuels que vous consultez, les
                                    sites Web ou les termes de recherche qui vous ont renvoyé vers le Site et des
                                    informations sur la manière dont vous interagissez avec le Site. Nous appelons ces
                                    informations collectées automatiquement « Informations sur l'appareil ».
                                </p>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Nous collectons des
                                        informations sur les appareils à l'aide des technologies suivantes :</h3>
                                    <p className="text-gray-700">
                                        <li>
                                            <strong>Cookies :</strong> Des petits fichiers de données stockés sur votre
                                            appareil ou votre ordinateur et qui incluent souvent un identifiant unique
                                            anonyme. Pour plus d'informations sur les cookies et comment les désactiver,
                                            visitez <strong>http://www.allaboutcookies.org</strong>.
                                        </li>
                                        <li className="mt-2">
                                            <strong>Fichiers journaux :</strong> Ils suivent les actions se produisant
                                            sur
                                            le site et collectent des données, notamment votre adresse IP, le type de
                                            navigateur, le fournisseur de services Internet, les pages de renvoi/sortie
                                            et les horodatages.
                                        </li>
                                    </p>

                                    <p className="text-gray-700 mt-4">
                                        En outre, lorsque vous effectuez un achat ou essayez d'effectuer un achat via le
                                        Site, nous collectons certaines informations auprès de vous, notamment votre
                                        nom,
                                        adresse de facturation, adresse de livraison, informations de paiement (y
                                        compris
                                        les numéros de carte de crédit), adresse e-mail et numéro de téléphone. Nous
                                        appelons ces informations « Informations de commande ».
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Utilisation des données */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.3}}
                        className="mb-12"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Users className="w-6 h-6 text-blue-500 mr-3"/>
                                    Comment nous utilisons vos données
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Services principaux</h4>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                            <li>Fournir nos services de développement</li>
                                            <li>Traiter vos commandes et paiements</li>
                                            <li>Communiquer avec vous sur vos projets</li>
                                            <li>Fournir un support client</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Amélioration des services</h4>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                            <li>Analyser l'utilisation de notre site</li>
                                            <li>Améliorer nos services et fonctionnalités</li>
                                            <li>Personnaliser votre expérience</li>
                                            <li>Prévenir la fraude et les abus</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Marketing</h4>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                            <li>Envoyer des newsletters (avec votre consentement)</li>
                                            <li>Vous informer de nos nouveaux services</li>
                                            <li>Partager du contenu pertinent</li>
                                            <li>Invitations à des événements</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-2">Obligations légales</h4>
                                        <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                            <li>Respecter nos obligations comptables</li>
                                            <li>Répondre aux demandes des autorités</li>
                                            <li>Protéger nos droits légaux</li>
                                            <li>Résoudre les litiges</li>
                                        </ul>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Partage des données */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.4}}
                        className="mb-12"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Lock className="w-6 h-6 text-blue-500 mr-3"/>
                                    Partage et protection de vos données
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Nous ne vendons jamais vos
                                        données</h3>
                                    <p className="text-gray-700">
                                        NeoCraft ne vend, ne loue, ni n'échange vos informations personnelles avec des
                                        tiers à des fins
                                        commerciales.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Partage limité avec des
                                        tiers</h3>
                                    <p className="text-gray-700 mb-3">
                                        Nous pouvons partager vos données uniquement dans les cas suivants :
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                                        <li>Prestataires de services (hébergement, paiement, analytics) sous contrat
                                            strict
                                        </li>
                                        <li>Partenaires techniques nécessaires à la réalisation de votre projet</li>
                                        <li>Obligations légales ou demandes des autorités compétentes</li>
                                        <li>Protection de nos droits, propriété ou sécurité</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Mesures de sécurité</h3>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="bg-blue-50 p-4 rounded-lg">
                                            <h4 className="font-medium text-blue-900 mb-2">Sécurité technique</h4>
                                            <ul className="text-sm text-blue-800 space-y-1">
                                                <li>• Chiffrement SSL/TLS</li>
                                                <li>• Serveurs sécurisés</li>
                                                <li>• Sauvegardes régulières</li>
                                                <li>• Accès restreint</li>
                                            </ul>
                                        </div>
                                        <div className="bg-cyan-50 p-4 rounded-lg">
                                            <h4 className="font-medium text-cyan-900 mb-2">Sécurité
                                                organisationnelle</h4>
                                            <ul className="text-sm text-cyan-800 space-y-1">
                                                <li>• Formation du personnel</li>
                                                <li>• Accords de confidentialité</li>
                                                <li>• Audits de sécurité</li>
                                                <li>• Procédures d'incident</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Vos droits */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.5}}
                        className="mb-12"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Shield className="w-6 h-6 text-blue-500 mr-3"/>
                                    Vos droits (RGPD)
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 mb-6">
                                    Conformément au Règlement Général sur la Protection des Données (RGPD), vous
                                    disposez des droits
                                    suivants :
                                </p>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div className="border-l-4 border-blue-500 pl-4">
                                            <h4 className="font-semibold text-gray-900">Droit d'accès</h4>
                                            <p className="text-sm text-gray-600">Obtenir une copie de vos données
                                                personnelles</p>
                                        </div>

                                        <div className="border-l-4 border-blue-500 pl-4">
                                            <h4 className="font-semibold text-gray-900">Droit de rectification</h4>
                                            <p className="text-sm text-gray-600">Corriger des données inexactes ou
                                                incomplètes</p>
                                        </div>

                                        <div className="border-l-4 border-blue-500 pl-4">
                                            <h4 className="font-semibold text-gray-900">Droit à l'effacement</h4>
                                            <p className="text-sm text-gray-600">Demander la suppression de vos
                                                données</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="border-l-4 border-cyan-500 pl-4">
                                            <h4 className="font-semibold text-gray-900">Droit à la portabilité</h4>
                                            <p className="text-sm text-gray-600">Récupérer vos données dans un format
                                                structuré</p>
                                        </div>

                                        <div className="border-l-4 border-cyan-500 pl-4">
                                            <h4 className="font-semibold text-gray-900">Droit d'opposition</h4>
                                            <p className="text-sm text-gray-600">Vous opposer au traitement de vos
                                                données</p>
                                        </div>

                                        <div className="border-l-4 border-cyan-500 pl-4">
                                            <h4 className="font-semibold text-gray-900">Droit de limitation</h4>
                                            <p className="text-sm text-gray-600">Limiter le traitement de vos
                                                données</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                                    <p className="text-sm text-gray-700">
                                        <strong>Comment exercer vos droits :</strong> Contactez-nous à l'adresse
                                        <a href="mailto:privacy@neocraft.fr"
                                           className="text-blue-600 hover:underline ml-1">
                                            privacy@neocraft.fr
                                        </a>
                                        avec une pièce d'identité. Nous répondrons dans un délai de 30 jours maximum.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>


                    {/* Modifications */}
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.8}}
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Modifications de cette politique</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 mb-4">
                                    Nous nous réservons le droit de modifier cette Politique de Confidentialité à tout
                                    moment. Les
                                    modifications importantes vous seront notifiées par :
                                </p>
                                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                                    <li>Email à votre adresse enregistrée</li>
                                    <li>Notification sur notre site web</li>
                                    <li>Mise à jour de la date de "dernière modification"</li>
                                </ul>
                                <p className="text-gray-700">
                                    Nous vous encourageons à consulter régulièrement cette page pour rester informé de
                                    nos pratiques en
                                    matière de protection des données.
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}
