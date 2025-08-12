import { config } from "@/config";
import {
  buildWispClient,
  GetPostsResult,
  GetPostResult,
} from "@wisp-cms/client";

export const wisp = buildWispClient({
  blogId: config.blogId,
});

export interface Tag {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  label: string;
  tag: string;
  description: string;
}

export async function getTags(): Promise<Category[]> {
  const result = await wisp.getTags();

  if (!result?.tags) return [];

  return result.tags.map((tag: Tag) => ({
    id: tag.id,
    label: tag.name,
    tag: tag.name,
    description: `Articles dans la catégorie ${tag.name}`,
  }));
}


export type { GetPostsResult, GetPostResult };
