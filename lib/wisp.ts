import { config } from "@/config";
import {
    buildWispClient,
    GetPostResult,
    GetPostsResult,
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

  // On filtre les tags réservés aux réalisations pour ne pas les afficher dans le blog
  return result.tags
    .filter((tag: Tag) => {
      const name = tag.name.toLowerCase();
      return name !== "realisation" && name !== "projet";
    })
    .map((tag: Tag) => ({
      id: tag.id,
      label: tag.name,
      tag: tag.name,
      description: `Articles dans la catégorie ${tag.name}`,
    }));
}


export type { GetPostResult, GetPostsResult };

