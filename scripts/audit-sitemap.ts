
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { VERNACULAR_DICTIONARY } from '../data/vernacular-dictionary';

// Types
interface AuditResult {
    url: string;
    type: 'Blog' | 'Tool' | 'Template' | 'Dictionary';
    score: number;
    issues: string[];
    details: {
        titleLength?: number;
        descLength?: number;
        wordCount?: number;
        hasH1?: boolean;
    };
}

const RESULTS: AuditResult[] = [];

// Helper: Calculate Score
function calculateScore(details: AuditResult['details'], issues: string[]): number {
    let score = 100;
    if (details.titleLength === 0) score -= 40;
    if (details.descLength === 0) score -= 40;
    if ((details.wordCount || 0) < 300) score -= 20; // Thin content penalty
    return Math.max(0, score);
}

// 1. Audit Blogs (Markdown)
function auditBlogs() {
    const blogDir = path.join(process.cwd(), 'content/blog');
    if (!fs.existsSync(blogDir)) return;

    const files = fs.readdirSync(blogDir);
    files.forEach(file => {
        if (!file.endsWith('.md')) return;

        const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
        const { data, content: text } = matter(content);
        const wordCount = text.split(/\s+/).length;

        const issues: string[] = [];
        if (!data.title) issues.push('Missing Title');
        if (!data.description) issues.push('Missing Description');
        if (wordCount < 300) issues.push(`Thin Content (${wordCount} words)`);

        RESULTS.push({
            url: `/learn/${file.replace('.md', '')}`,
            type: 'Blog',
            score: calculateScore({ titleLength: data.title?.length || 0, descLength: data.description?.length || 0, wordCount }, issues),
            issues,
            details: { wordCount }
        });
    });
}

// 2. Audit Tools (Interview) & Templates (Static TSX)
function auditStaticDir(category: 'Tool' | 'Template', dirName: string) {
    const baseDir = path.join(process.cwd(), `app/(marketing)/${dirName}`);
    if (!fs.existsSync(baseDir)) return;

    const dirs = fs.readdirSync(baseDir);
    dirs.forEach(slug => {
        // Skip files, only check directories which house page.tsx
        if (!fs.statSync(path.join(baseDir, slug)).isDirectory()) return;

        const pagePath = path.join(baseDir, slug, 'page.tsx');
        if (!fs.existsSync(pagePath)) return;

        const content = fs.readFileSync(pagePath, 'utf8');

        // Simple regex heuristics for TSX/React pages
        const hasMetadata = content.includes('export const metadata') || content.includes('generateMetadata');
        // Count words roughly by stripping HTML/JSX tags
        const textOnly = content.replace(/<[^>]*>/g, ' ').replace(/import[\s\S]*?;/g, '').replace(/\s+/g, ' ');
        const wordCount = textOnly.split(' ').length;

        const issues: string[] = [];
        if (!hasMetadata) issues.push('Missing Explicit Metadata');
        if (wordCount < 300) issues.push(`Thin Content (${wordCount} words)`);

        RESULTS.push({
            url: `/${dirName}/${slug}`,
            type: category,
            score: calculateScore({ titleLength: hasMetadata ? 50 : 0, descLength: hasMetadata ? 100 : 0, wordCount }, issues),
            issues,
            details: { wordCount, hasH1: content.includes('<h1') }
        });
    });
}

// 3. Audit Dictionary (Data)
function auditDictionary() {
    const TEMPLATE_WORDS = 350; // Estimated static content in page.tsx template
    VERNACULAR_DICTIONARY.forEach(entry => {
        // Estimate word count based on fields
        const totalText = `${entry.exampleSentence} ${entry.businessContext} ${entry.hindiMeaning} ${entry.tamilMeaning}`;
        const wordCount = totalText.split(/\s+/).length + TEMPLATE_WORDS;

        const issues: string[] = [];
        // Dictionary pages are naturally short, but let's see if they are TOO short (< 50 words?)
        if (wordCount < 300) issues.push(`Very Thin Content (${wordCount} words)`);

        RESULTS.push({
            url: `/meaning/${entry.slug}`,
            type: 'Dictionary',
            score: wordCount < 300 ? 50 : 100, // Simple score
            issues,
            details: { wordCount }
        });
    });
}

// Main
console.log('🔍 STARTING MASTER SITE AUDIT...\n');

auditBlogs();
auditStaticDir('Tool', 'interview');
auditStaticDir('Template', 'templates');
auditDictionary();

// Report
let failures = 0;
RESULTS.forEach(r => {
    if (r.score < 80) {
        failures++;
        console.log(`❌ [${r.type}] ${r.url}`);
        console.log(`   Score: ${r.score}/100`);
        r.issues.forEach(i => console.log(`   - ${i}`));
        console.log('-----------------------------------');
    }
});

if (failures === 0) {
    console.log('✅ ALL PAGES PASSED AUDIT!');
} else {
    console.log(`\n⚠️ FOUND ${failures} PAGES WITH ISSUES.`);
}
