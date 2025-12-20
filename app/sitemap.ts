// app/sitemap.ts
import { wisp } from '@/lib/wisp';
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.neocraft.dev';

    try {
        // Récupérer tous les articles depuis Wisp
        const postsResult = await wisp.getPosts({
            limit: 1000,
            // Optionnel : filtrer par statut publié
            // status: 'published'
        });

        const posts = postsResult.posts || [];

        // URLs statiques principales
        const staticUrls: MetadataRoute.Sitemap = [
            {
                url: `${baseUrl}/fr`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 1.0,
            },
            {
                url: `${baseUrl}/en`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 1.0,
            },
            {
                url: `${baseUrl}/fr/blog`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 0.8,
            },
            {
                url: `${baseUrl}/en/blog`,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 0.8,
            },
            {
                url: `${baseUrl}/fr/about`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            },
            {
                url: `${baseUrl}/en/about`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            },
            {
                url: `${baseUrl}/fr/team`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            },
            {
                url: `${baseUrl}/en/team`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.7,
            }
        ];

        // URLs dynamiques des articles Wisp
        const postUrls: MetadataRoute.Sitemap = posts.flatMap((post) => [
            // Version française
            {
                url: `${baseUrl}/fr/blog/${post.slug}`,
                lastModified: new Date(post.updatedAt || post.createdAt),
                changeFrequency: 'monthly' as const,
                priority: 0.6,
            },
            // Version anglaise
            {
                url: `${baseUrl}/en/blog/${post.slug}`,
                lastModified: new Date(post.updatedAt || post.createdAt),
                changeFrequency: 'monthly' as const,
                priority: 0.6,
            }
        ]);

        // Optionnel : URLs des catégories/tags
        const tagsResult = await wisp.getTags();
        const tags = tagsResult.tags || [];

        const tagUrls: MetadataRoute.Sitemap = tags.flatMap((tag) => [
            {
                url: `${baseUrl}/fr/blog/tag/${tag.name.toLowerCase()}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.5,
            },
            {
                url: `${baseUrl}/en/blog/tag/${tag.name.toLowerCase()}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.5,
            }
        ]);

        return [...staticUrls, ...postUrls, ...tagUrls];

    } catch (error) {
        console.error('Erreur lors de la génération du sitemap:', error);

        // Fallback : retourner au moins les URLs statiques
        return [
            {
                url: `${baseUrl}/fr`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 1.0,
            },
            {
                url: `${baseUrl}/en`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: 1.0,
            }
        ];
    }
}
