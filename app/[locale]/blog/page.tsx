export const revalidate = 60; // 1 minute

import { BlogPostList } from "@/components/BlogPostList";
import { PostPagination } from "@/components/PostPagination";
import { getOgImageUrl } from "@/lib/ogImage";
import { wisp, getTags } from "@/lib/wisp";
import { Metadata } from "next";
import { FilterBar } from "@/components/FilterBar";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import { config, } from "@/config";


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
    limit: 6,
    query: searchParams?.query,
    page,
  });

  return (

      <div className=" p-6 ">
      <FullWidthHeader title={title} />
        <FilterBar active="latest" className="my-8" categories={categories} />
        <BlogPostList posts={result.posts} />
        <PostPagination
          pagination={result.pagination}
          className="my-16"
          query={searchParams?.query}
        />
    </div>
  );
}
