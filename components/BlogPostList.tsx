import Image from "next/image";
import Link from "next/link";
import type { GetPostsResult } from "@wisp-cms/client";
import { formatFullDate } from "@/lib/date";

export const BlogPostList = ({ posts }: { posts: GetPostsResult["posts"] }) => {
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-3 lg:grid-cols-4 px-4">
      {posts.map((post) => (
        <div className="break-words" key={post.id}>
          <Link href={`/blog/post/${post.slug}`}>
            <div className="aspect-[16/9] relative">
              {post.image ? (
                <Image
                  alt={post.title}
                  className="object-cover rounded-3xl"
                  src={post.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={true}

                />
              ) : (
                <Image src="/placeholder.jpg" alt="placeholder" fill />
              )}
            </div>
          </Link>
          <div className="grid grid-cols-1 gap-3 md:col-span-2 mt-4">
            <h2 className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">
              <Link href={`/blog/post/${post.slug}`}>{post.title}</Link>
            </h2>
            <div className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
              {post.description}
            </div>
            <div className="flex items-center gap-2">
              <div className="font-medium">
                 Publié le{" "}
                {formatFullDate(post.publishedAt || post.createdAt)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
