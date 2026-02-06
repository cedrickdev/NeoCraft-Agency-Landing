export const revalidate = 60; // 1 minute

import { BlogPostList } from "@/components/BlogPostList";
import { FilterBar } from "@/components/FilterBar";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import { PostPagination } from "@/components/PostPagination";
import { Button } from "@/components/ui/button";
import { config, } from "@/config";
import { getOgImageUrl } from "@/lib/ogImage";
import { getTags, wisp } from "@/lib/wisp";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
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

export default async function Page(
  props: {
    searchParams?: Promise<{ query: string; page: string }>;
  }
) {
  const categories = await getTags();
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const result = await wisp.getPosts({
    limit: 50, // Fetch more to account for filtered posts
    query: searchParams?.query,
    page,
  });

  // Filtrer les articles qui sont des réalisations
  const filteredPosts = result.posts.filter(post => 
    !post.tags.some(tag => {
      const name = tag.name.toLowerCase();
      return name === "realisation" || name === "projet";
    })
  );

  return (

      <div className=" p-6 pt-32 ">
        <div className="container mx-auto max-w-6xl mb-8">
          <Button variant="ghost" asChild className="group text-muted-foreground hover:text-primary transition-colors">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>
        <FullWidthHeader title={title} />
        <FilterBar active="latest" className="my-8" categories={categories} />
        <BlogPostList posts={filteredPosts} />
        <PostPagination
          pagination={result.pagination}
          className="my-16"
          query={searchParams?.query}
        />
    </div>
  );
}
