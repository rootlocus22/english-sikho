import { MetadataRoute } from 'next'
import { getAllPostSlugs } from '@/lib/blog'
import { SEO_KEYWORDS } from '@/data/seo-keywords'

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
        // High-Intent Tools (Bucket 1)
        { url: `${baseUrl}/tools/self-introduction-generator`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
        { url: `${baseUrl}/interview/why-should-we-hire-you`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/interview/strengths-and-weaknesses`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/interview/top-10-interview-questions`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        // Office Survival Templates (Bucket 2)
        { url: `${baseUrl}/templates/sick-leave-email`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/templates/resignation-letter-generator`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/templates/salary-negotiation-email`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/templates/request-for-leave`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/templates/apology-letter-to-client`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    ]

    // Blog pages (SEO content) - dynamic from markdown
    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/learn/${post.slug}`,
        lastModified: now, // Could ideally read file mtime
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    // Topic pages (Programmatic SEO)
    const topicPages: MetadataRoute.Sitemap = SEO_KEYWORDS.map((item) => ({
        url: `${baseUrl}/topic/${item.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [...staticPages, ...blogPages, ...topicPages]
}
