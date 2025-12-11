import { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/blog'
import { TOPIC_KEYWORDS } from '@/lib/seo-keywords'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://englishgyani.com'
    const now = new Date()

    // Get dynamic blog slugs from file system
    const blogPosts = getAllPostSlugs()

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/features`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/learn`,
            lastModified: now,
            changeFrequency: 'daily',
            priority: 0.9,
        },
    ]

    // Blog pages (SEO content) - dynamic from markdown
    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/learn/${post.params.slug}`,
        lastModified: now, // Could ideally read file mtime
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // Topic pages (Programmatic SEO)
    const topicPages: MetadataRoute.Sitemap = TOPIC_KEYWORDS.map((slug) => ({
        url: `${baseUrl}/topic/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...staticPages, ...blogPages, ...topicPages]
}
