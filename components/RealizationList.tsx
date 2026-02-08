"use client";

import type { GetPostsResult } from "@wisp-cms/client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Layers3, Link as LinkIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";

interface RealizationListProps {
  posts: GetPostsResult["posts"];
}

export const RealizationList = ({ posts }: RealizationListProps) => {
  const t = useTranslations("Realisations");
  const [activeTag, setActiveTag] = useState<string>("all");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const fallbackCopy = (text: string) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try { document.execCommand("copy"); } catch { /* noop */ }
    document.body.removeChild(textarea);
  };

  const copyLink = useCallback((e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/blog/post/${slug}`;
    
    const onCopied = () => {
      setCopiedSlug(slug);
      setTimeout(() => setCopiedSlug(null), 2000);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(url).then(onCopied).catch(() => {
        fallbackCopy(url);
        onCopied();
      });
    } else {
      fallbackCopy(url);
      onCopied();
    }
  }, []);

  // Extract unique tags from all posts
  const allTags = useMemo(() => {
    const tagSet = new Map<string, string>();
    posts.forEach((post) =>
      post.tags.forEach((tag) => {
        tagSet.set(tag.name.toLowerCase(), tag.name);
      })
    );
    return Array.from(tagSet.values());
  }, [posts]);

  // Filter posts based on active tag
  const filteredPosts = useMemo(() => {
    if (activeTag === "all") return posts;
    return posts.filter((post) =>
      post.tags.some((tag) => tag.name.toLowerCase() === activeTag.toLowerCase())
    );
  }, [posts, activeTag]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  // Bento grid: alternate sizes for visual interest
  const getGridClass = (idx: number) => {
    const pattern = idx % 6;
    // 0: large (spans 2 cols), 1: normal, 2: normal, 3: normal, 4: normal, 5: large
    if (pattern === 0 || pattern === 5) return "md:col-span-2";
    return "md:col-span-1";
  };

  const getAspectClass = (idx: number) => {
    const pattern = idx % 6;
    if (pattern === 0 || pattern === 5) return "aspect-[21/10]";
    return "aspect-[4/3]";
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Tag Filters */}
      {allTags.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap gap-2 mb-16"
        >
          <button
            onClick={() => setActiveTag("all")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTag === "all"
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
            }`}
          >
            {t("filterAll")}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTag.toLowerCase() === tag.toLowerCase()
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-primary/5 text-muted-foreground hover:bg-primary/10 hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>
      )}

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-32 text-center"
        >
          <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center mb-6">
            <Layers3 className="w-10 h-10 text-primary/30" />
          </div>
          <h3 className="text-2xl font-bold mb-2">{t("emptyTitle")}</h3>
          <p className="text-muted-foreground max-w-md">{t("emptyDescription")}</p>
        </motion.div>
      )}

      {/* Bento Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag}
          variants={container}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {filteredPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              variants={item}
              layout
              className={`group relative ${getGridClass(idx)}`}
            >
              <Link href={`/blog/post/${post.slug}`} className="block">
                <div
                  className={`relative ${getAspectClass(idx)} overflow-hidden rounded-2xl border border-primary/5 bg-primary/[0.02] group-hover:border-primary/20 transition-all duration-500`}
                >
                  {post.image ? (
                    <Image
                      alt={post.title}
                      src={post.image}
                      fill
                      sizes={
                        getGridClass(idx).includes("col-span-2")
                          ? "(max-width: 768px) 100vw, 66vw"
                          : "(max-width: 768px) 100vw, 33vw"
                      }
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={idx < 3}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10 flex items-center justify-center">
                      <span className="text-primary/15 font-black text-7xl select-none">
                        N
                      </span>
                    </div>
                  )}

                  {/* Gradient overlay - strong enough for title readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 group-hover:via-black/50 transition-all duration-500" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                    {/* Tags - always visible */}
                    <div className="flex items-center gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="text-[10px] uppercase tracking-[0.15em] font-bold bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-white/80"
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>

                    {/* Title - always visible */}
                    <h3 className="text-xl md:text-2xl font-bold text-white/85 leading-tight [text-shadow:_0_2px_12px_rgba(0,0,0,0.3)]">
                      {post.title}
                    </h3>

                    {/* Description - visible on hover */}
                    {post.description && (
                      <p className="text-white/70 text-sm mt-2 line-clamp-2 max-h-0 group-hover:max-h-20 opacity-0 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                        {post.description}
                      </p>
                    )}

                    {/* CTA - visible on hover */}
                    <div className="flex items-center gap-3 mt-0 group-hover:mt-4 max-h-0 group-hover:max-h-10 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 overflow-hidden">
                      <span className="flex items-center gap-1.5 text-white/80 text-sm font-semibold">
                        {t("viewProject")}
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                      <button
                        onClick={(e) => copyLink(e, post.slug)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white/80 text-xs font-semibold hover:bg-white/25 transition-all"
                        title={t("copyLink")}
                      >
                        {copiedSlug === post.slug ? (
                          <><Check className="w-3 h-3" /> {t("linkCopied")}</>
                        ) : (
                          <><LinkIcon className="w-3 h-3" /> {t("copyLink")}</>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
