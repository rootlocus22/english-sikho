
import fs from 'fs';
import path from 'path';

// Manual mapping of files to "URLs" for reporting
const STATIC_PAGES = [
    { name: 'Home', path: 'app/(marketing)/page.tsx' },
    { name: 'About', path: 'app/(marketing)/about/page.tsx' },
    { name: 'Contact', path: 'app/(marketing)/contact/page.tsx' },
    { name: 'Features', path: 'app/(marketing)/features/page.tsx' },
    { name: 'Pricing', path: 'app/(marketing)/pricing/page.tsx' },
    { name: 'Tool: Self Intro', path: 'app/(marketing)/tools/self-introduction-generator/page.tsx' },
    { name: 'Privacy', path: 'app/(marketing)/privacy/page.tsx' },
];

const ROOT_DIR = process.cwd();

const extractMetadata = (content: string) => {
    const titleMatch = content.match(/title:\s*['"](.*?)['"]/);
    const descMatch = content.match(/description:\s*['"](.*?)['"]/);
    return {
        title: titleMatch ? titleMatch[1] : null,
        description: descMatch ? descMatch[1] : null,
    };
};

const countWords = (content: string) => {
    // Very basic strip tags - not perfect but good enough for estimation
    const cleanText = content.replace(/<[^>]*>/g, ' ').replace(/[{}'"=]/g, '');
    return cleanText.split(/\s+/).filter(w => w.length > 2).length;
};

const auditStaticPages = () => {
    console.log('\n🔍 STARTING STATIC PAGE AUDIT...\n');

    STATIC_PAGES.forEach(page => {
        const fullPath = path.join(ROOT_DIR, page.path);

        if (!fs.existsSync(fullPath)) {
            console.log(`❌ ${page.name}: File not found at ${page.path}`);
            return;
        }

        const content = fs.readFileSync(fullPath, 'utf-8');
        const metadata = extractMetadata(content);
        const wordCount = countWords(content);
        let score = 100;
        const issues = [];

        // Meta Checks
        if (!metadata.title) {
            issues.push('❌ Missing Metadata Title');
            score -= 20;
        } else if (metadata.title.length < 30) {
            issues.push(`⚠️ Title too short (${metadata.title.length} chars)`);
            score -= 5;
        }

        if (!metadata.description) {
            issues.push('❌ Missing Metadata Description');
            score -= 20;
        } else if (metadata.description.length < 120) {
            issues.push(`⚠️ Description too short (${metadata.description.length} chars)`);
            score -= 5;
        }

        // Content Check
        if (wordCount < 300) {
            issues.push(`🛑 Thin Content (<300 words): Found ~${wordCount} words`);
            score -= 30;
        }

        // Report
        console.log(`📄 Page: ${page.name}`);
        console.log(`   Score: ${score}/100`);
        if (issues.length > 0) {
            issues.forEach(i => console.log(`   ${i}`));
        } else {
            console.log('   ✅ SEO King Status');
        }
        console.log('------------------------------');
    });
};

auditStaticPages();
