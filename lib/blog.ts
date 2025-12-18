import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { SEO_KEYWORDS } from '@/data/seo-keywords';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    contentHtml: string;
}

export function getAllPostSlugs() {
    let filePaths: { slug: string }[] = [];


    // 1. Get slugs from file system if directory exists
    if (fs.existsSync(postsDirectory)) {
        const fileNames = fs.readdirSync(postsDirectory);
        filePaths = fileNames.map((fileName) => {
            return {
                slug: fileName.replace(/\.md$/, ''),
            };
        });
    }

    return filePaths;
}

export function getSortedPostsData() {
    let allPostsData: any[] = [];

    // 1. Get file posts
    if (fs.existsSync(postsDirectory)) {
        const fileNames = fs.readdirSync(postsDirectory);
        const filePosts = fileNames.map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);

            return {
                slug,
                ...(matterResult.data as { date: string; title: string; description: string; tags: string[] }),
            };
        });
        allPostsData = [...allPostsData, ...filePosts];
    }

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export async function getPostData(slug: string) {
    // 1. Fallback to File System
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    // Ensure file exists before trying to read to provide a cleaner error
    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post not found: ${slug}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        slug,
        contentHtml,
        ...(matterResult.data as { date: string; title: string; description: string; tags: string[] }),
    };
}
