export const revalidate = 60; // 1 minute

import { BlogPostList } from "@/components/BlogPostList";
import { FilterBar } from "@/components/FilterBar";
import { PostPagination } from "@/components/PostPagination";
import { Button } from "@/components/ui/button";
import { config } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";
import { getTags, wisp } from "@/lib/wisp";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const { title, description } = config;

export const metadata: Metadata = {
  title: `${title} - Blog`,
  description,
  openGraph: {
    title: `${title} - Blog`,
    description,
    images: [getOgImageUrl(title)],
  },
};

export default async function Page(props: {
  searchParams?: Promise<{ query: string; page: string }>;
}) {
  const t = await getTranslations("Blog");
  const categories = await getTags();
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const result = await wisp.getPosts({
    limit: 50,
    query: searchParams?.query,
    page,
  });

  // Filtrer les articles qui sont des réalisations
  const filteredPosts = result.posts.filter(
    (post) =>
      !post.tags.some((tag) => {
        const name = tag.name.toLowerCase();
        return name === "realisation" || name === "projet";
      })
  );

  return (
    <div className="min-h-screen pb-20 pt-32">
      {/* Back button */}
      <div className="container mx-auto max-w-6xl px-4 mb-8">
        <Button
          variant="ghost"
          asChild
          className="group text-muted-foreground hover:text-primary transition-colors"
        >
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{t("backToHome")}</span>
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 mb-16">
        <div className="max-w-3xl">
          <span className="text-[10px] uppercase tracking-[0.3em] font-black text-primary/40 mb-4 block">
            Blog
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-none">
            {t("pageTitle")}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            {t("pageDescription")}
          </p>
        </div>
      </div>

      {/* Filter */}
      <FilterBar active="latest" className="mb-12" categories={categories} />

      {/* Posts */}
      <BlogPostList posts={filteredPosts} />

      {/* Pagination */}
      <PostPagination
        pagination={result.pagination}
        className="my-16"
        query={searchParams?.query}
      />
    </div>
  );
}
