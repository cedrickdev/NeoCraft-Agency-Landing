"use client";

import { formatFullDate } from "@/lib/date";
import type { GetPostsResult } from "@wisp-cms/client";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface BlogPostListProps {
  posts: GetPostsResult["posts"];
}

export const BlogPostList = ({ posts }: BlogPostListProps) => {
  const t = useTranslations("Blog");

  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-32 text-center"
      >
        <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center mb-6">
          <Clock className="w-10 h-10 text-primary/30" />
        </div>
        <h3 className="text-2xl font-bold mb-2">{t("emptyTitle")}</h3>
        <p className="text-muted-foreground max-w-md">{t("emptyDescription")}</p>
      </motion.div>
    );
  }

  const [featured, ...rest] = posts;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Estimate reading time (~200 words/min)
  const getReadTime = (description: string | null) => {
    if (!description) return "2 min";
    const words = description.split(/\s+/).length;
    const time = Math.max(2, Math.ceil(words / 40));
    return `${time} min`;
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-6xl mx-auto px-4"
    >
      {/* Featured Post - Hero Card */}
      <motion.div variants={item} className="mb-12">
        <Link href={`/blog/post/${featured.slug}`} className="group block">
          <div className="relative overflow-hidden rounded-2xl border border-primary/5 bg-primary/[0.02] group-hover:border-primary/20 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[420px] overflow-hidden">
                {featured.image ? (
                  <Image
                    alt={featured.title}
                    src={featured.image}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                    <span className="text-primary/15 font-black text-8xl select-none">N</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="text-[10px] uppercase tracking-[0.15em] font-bold bg-primary/10 text-primary px-3 py-1 rounded-full"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                  {featured.title}
                </h2>

                {featured.description && (
                  <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3 text-lg">
                    {featured.description}
                  </p>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formatFullDate(featured.publishedAt || featured.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{getReadTime(featured.description)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-primary font-semibold group/btn">
                  <span>{t("readArticle")}</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Rest of Posts - Grid */}
      {rest.length > 0 && (
        <motion.div
          variants={container}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {rest.map((post) => (
            <motion.div key={post.id} variants={item} className="group">
              <Link href={`/blog/post/${post.slug}`} className="block">
                <div className="overflow-hidden rounded-2xl border border-primary/5 bg-primary/[0.02] group-hover:border-primary/20 transition-all duration-500 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {post.image ? (
                      <Image
                        alt={post.title}
                        src={post.image}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                        <span className="text-primary/15 font-black text-6xl select-none">N</span>
                      </div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="text-[9px] uppercase tracking-[0.15em] font-bold bg-primary/10 text-primary px-2.5 py-0.5 rounded-full"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-xl font-bold tracking-tight mb-2 leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                      {post.description || "\u00A0"}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-4 border-t border-primary/5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        <span>{formatFullDate(post.publishedAt || post.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3" />
                        <span>{getReadTime(post.description)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};
