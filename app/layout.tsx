import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NeoCraft - L'artisanat du code, réinventé",
  description:
    "NeoCraft conçoit des solutions digitales sur mesure et forme les esprits techniques de demain. Développement web personnalisé, UI/UX et formation technique.",
  keywords: "développement web, startup tech, formation technique, UI/UX, solutions digitales",
  authors: [{ name: "NeoCraft" }],
  openGraph: {
    title: "NeoCraft - L'artisanat du code, réinventé",
    description: "Solutions digitales sur mesure et formation technique de qualité",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
