"use client";

import type { GetPostsResult } from "@wisp-cms/client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export const RealizationList = ({ posts }: { posts: GetPostsResult["posts"] }) => {
  const t = useTranslations("Realisations");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-7xl mx-auto"
    >
      {posts.map((post, idx) => (
        <motion.div key={post.id} variants={item} className="group relative">
          <Link href={`/blog/post/${post.slug}`} className="block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] glass-card border-primary/10 group-hover:border-primary/30 transition-all duration-500">
              {post.image ? (
                <Image
                  alt={post.title}
                  src={post.image}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={idx < 2}
                />
              ) : (
                <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                  <span className="text-primary/20 font-black text-6xl">N</span>
                </div>
              )}
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-[2px] flex flex-col justify-end p-10">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag.id} className="text-[10px] uppercase tracking-widest font-bold bg-white/20 px-3 py-1 rounded-full text-white backdrop-blur-md">
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6 leading-tight">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-white/80 font-bold group/btn">
                    <span>{t('viewProject')}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
          
          {/* External text for SEO and readability if overlay is missed */}
          <div className="mt-8 px-4">
            <h3 className="text-2xl font-bold mb-2 tracking-tight group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-muted-foreground line-clamp-1 text-sm font-medium">
              {post.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
