import urlJoin from "url-join";
import { wisp } from "@/lib/wisp";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";


// Config statique simple (pour usage rapide)
export const config = {
  blogId: process.env.NEXT_PUBLIC_BLOG_ID || "No blog ID found",
  baseUrl,
  logoUrl: urlJoin(baseUrl, "logo.png"),
  organization: process.env.NEXT_PUBLIC_BLOG_ORGANIZATION || "Neocraft",
  title: process.env.NEXT_PUBLIC_BLOG_TITLE || "Blog",
  description:
    process.env.NEXT_PUBLIC_BLOG_DESCRIPTION ||
    "Let's build something amazing!",
};

