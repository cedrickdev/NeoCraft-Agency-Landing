export const revalidate = 60; // 1 minute

import { BlogPostList } from "@/components/BlogPostList";
import { PostPagination } from "@/components/PostPagination";
import { wisp, getTags } from "@/lib/wisp";
import { FilterBar } from "@/components/FilterBar";
import { FullWidthHeader } from "@/components/FullWidthHeader";
import { config } from "@/config";
import { Metadata } from "next";
import { getOgImageUrl } from "@/lib/ogImage";


export async function generateMetadata(
  props: {
    params: Promise<{ tag: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;

  const {
    tag
  } = params;

  return {
    title: `Articles de blog marqués avec #${tag}`,
    description: `Liste de tous les articles de blog sur ${config.organization} marqués avec #${tag}`,
    openGraph: {
      title: `Articles de blog marqués avec #${tag}`,
      description: `Liste de tous les articles de blog sur ${config.organization} marqués avec #${tag}`,
      images: [getOgImageUrl(`#${tag}`)],
    },
  };
}

export default async function Page(
  props: {
    searchParams?: Promise<{ query: string; page: string }>;
    params: Promise<{ tag: string }>;
  }
) {
  const params = await props.params;

  const {
    tag
  } = params;
  
   const categories = await getTags();
  const searchParams = await props.searchParams;
  const category = categories.find((c) => c.tag === tag);
  const { label, description } = category || {
    label: `#${tag}`,
    description: `Articles de blog marqués avec #${tag}`,
  };
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const result = await wisp.getPosts({
    limit: 6,
    tags: [tag],
    query: searchParams?.query,
    page,
  });

  return (
    <>
      <FullWidthHeader
        title={label}
        breadcrumb={[
          { label: "Blog", href: "/blog" },
          { label: "Category", href: `/blog/category/` },
          { label, href: `/blog/category/${tag}` },
        ]}
      />
      <div className="container mx-auto max-w-6xl">
        <FilterBar active={tag} categories={categories} className="my-8" />
        <BlogPostList posts={result.posts} />
        <PostPagination
          pagination={result.pagination}
          className="my-16"
          query={searchParams?.query}
          basePath={`/blog/category/${tag}`}
        />
      </div>
    </>
  );
}
