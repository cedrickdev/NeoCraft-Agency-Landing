"use client";
import { usePathname } from "next/navigation";

export default function CanonicalTag() {
  const pathname = usePathname();
  const canonicalUrl = `https://www.neocraft.dev${pathname}`;

  return <link rel="canonical" href={canonicalUrl} />;
}
