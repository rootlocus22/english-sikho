
import fs from 'fs';
import path from 'path';
import { SEO_KEYWORDS } from '../data/seo-keywords';
import { VERNACULAR_DICTIONARY } from '../data/vernacular-dictionary';

// 1. Build Registry of Valid URLs
const VALID_URLS = new Set<string>();

// Static Routes (manual list for now, or scan app dir)
const STATIC_ROUTES = [
    '/', '/about', '/contact', '/pricing', '/features', '/login', '/signup',
    '/dashboard', '/dashboard/templates', '/refund-policy', '/privacy', '/terms',
    '/tools/self-introduction-generator',
    '/interview/top-10-interview-questions', '/interview/why-should-we-hire-you', '/interview/strengths-and-weaknesses',
    '/templates/sick-leave-email', '/templates/resignation-letter-generator', '/templates/salary-negotiation-email',
    '/templates/request-for-leave', '/templates/apology-letter-to-client'
];
STATIC_ROUTES.forEach(u => VALID_URLS.add(u));

// Programmatic Pages (/learn/ now Hybrid)
SEO_KEYWORDS.forEach(k => {
    VALID_URLS.add(`/learn/${k.slug}`);
});

VALID_URLS.add('/tools'); // New Tools Index

// Dictionary Pages (/meaning/)
VERNACULAR_DICTIONARY.forEach(w => {
    VALID_URLS.add(`/meaning/${w.slug}`);
});

// Blog Pages (/learn/) - Scan content/blog
const blogDir = path.join(process.cwd(), 'content/blog');
if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir);
    files.forEach(f => {
        if (f.endsWith('.md')) {
            VALID_URLS.add(`/learn/${f.replace('.md', '')}`);
        }
    });
}
// Add manually known blogs if any (e.g. from static array in sitemap if not in files) - assuming files are source of truth now.


// 2. Function to Scan Files for Links
function scanFileForLinks(filePath: string) {
    if (!fs.existsSync(filePath)) return;

    const content = fs.readFileSync(filePath, 'utf8');
    // Regex to find href="..." inside Link or a tags. 
    // Matches href="/..." or href={`/...`}
    const linkRegex = /href=["'](\/[^"']+)["']|href={`(\/[^`]+)`}/g;

    let match;
    let issuesFound = 0;

    console.log(`\n🔍 Scanning: ${path.relative(process.cwd(), filePath)}`);

    while ((match = linkRegex.exec(content)) !== null) {
        let url = match[1] || match[2];

        // Handle dynamic parts in template literals roughly
        // e.g., `/topic/${k.slug}` -> we can't validate purely statically easily unless we resolve variable.
        // BUT, if it is a literal string link like "/learn/spoken-english..." we CAN validate.

        if (url.includes('${')) {
            // Dynamic link. Skip strict validation but check prefix.
            // e.g. /topic/${slug} -> valid prefix /topic/
            const prefix = url.split('$')[0];
            if (!['/topic/', '/meaning/', '/learn/', '/dashboard/templates/email/', '/dashboard/templates/vocabulary/'].some(p => prefix.startsWith(p))) {
                console.log(`   ⚠️  Potential Issue (Unknown Dynamic Pattern): ${url}`);
            }
            continue;
        }

        // Validate Static Link
        if (!VALID_URLS.has(url)) {
            // Exceptions for partial matches if needed? No, exact match.
            console.log(`   ❌ BROKEN LINK: ${url}`);
            issuesFound++;
        } else {
            // console.log(`   ✅ Valid: ${url}`);
        }
    }

    if (issuesFound === 0) console.log(`   ✅ No broken static links found.`);
}

// 3. Main Execution
console.log('🚀 STARTING BROKEN LINK CHECKER...');
console.log(`ℹ️  Registry size: ${VALID_URLS.size} valid URLs.`);

const FILES_TO_CHECK = [
    'components/Footer.tsx',
    'app/(marketing)/page.tsx',
    'components/FeaturesSection.tsx'
];

FILES_TO_CHECK.forEach(f => scanFileForLinks(path.join(process.cwd(), f)));

console.log('\n🏁 Check Complete.');
