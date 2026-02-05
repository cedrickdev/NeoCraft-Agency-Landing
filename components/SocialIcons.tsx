"use client"

import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"

const socialLinks = [
  { name: "facebook", href: "https://www.facebook.com/neocraftdev", label: "Facebook" },
  { name: "linkedin", href: "https://www.linkedin.com/company/neocraftdev", label: "LinkedIn" },
  { name: "x", href: "https://x.com/neocraftdev", label: "X" },
  { name: "instagram", href: "https://www.instagram.com/neocraftdev/", label: "Instagram" },
  { name: "mastodon", href: "https://mastodon.social/@neocraftdev", label: "Mastodon" },
]

export function SocialIcons() {
  const { resolvedTheme } = useTheme()

  const getIconSrc = (name: string) => {
    if (name === "x") {
      return resolvedTheme === "dark" ? "/icons/x-light.svg" : "/icons/x-dark.svg"
    }
    return `/icons/${name}.svg`
  }

  return (
    <div className="flex items-center gap-5">
      {socialLinks.map((social, i) => (
        <Link
          key={i}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="transition-all duration-300 hover:scale-110 hover:opacity-100 opacity-70"
        >
          <Image
            src={getIconSrc(social.name)}
            alt={social.label}
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </Link>
      ))}
    </div>
  )
}
