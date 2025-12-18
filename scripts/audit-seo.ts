
import { SEO_KEYWORDS } from '../data/seo-keywords';

interface AuditResult {
    slug: string;
    score: number;
    issues: string[];
}

const checkSEO = (keyword: typeof SEO_KEYWORDS[0]): AuditResult => {
    const issues: string[] = [];
    let score = 100;

    // 1. URL/Slug Check
    if (keyword.slug !== keyword.slug.toLowerCase()) {
        issues.push('❌ Slug contains uppercase letters');
        score -= 10;
    }
    if (keyword.slug.includes(' ')) {
        issues.push('❌ Slug contains spaces');
        score -= 20;
    }

    // 2. Title Check (Google prefers 50-60 characters)
    if (keyword.title.length < 30) {
        issues.push(`⚠️ Title too short (${keyword.title.length} chars). Aim for 50-60.`);
        score -= 5;
    }
    if (keyword.title.length > 60) {
        issues.push(`⚠️ Title too long (${keyword.title.length} chars). Google may truncate.`);
        score -= 5;
    }

    // 3. Meta Description Check (Google prefers 150-160 characters)
    if (!keyword.metaDescription) {
        issues.push('🛑 CRITICAL: Meta Description Missing!');
        score -= 50;
    } else {
        if (keyword.metaDescription.length < 120) {
            issues.push(`⚠️ Meta Description too short (${keyword.metaDescription.length} chars). Aim for 150-160.`);
            score -= 5;
        }
        if (keyword.metaDescription.length > 170) {
            issues.push(`⚠️ Meta Description too long (${keyword.metaDescription.length} chars). Google may truncate.`);
            score -= 5;
        }
    }

    // 4. Content Depth (Thin Content Check)
    const wordCount = keyword.content ? keyword.content.split(/\s+/).length : 0;
    if (wordCount < 300) {
        issues.push(`🛑 Thin Content Warning (<300 words). Current: ${wordCount} words.`);
        score -= 30; // Heavy penalty for thin content
    }

    // 5. Keyword Placement (Content)
    // Simple check if title/keyword appears in content
    if (!keyword.content?.toLowerCase().includes('english')) {
        issues.push('⚠️ Main keyword "English" missing in content body.');
        score -= 10;
    }

    return { slug: keyword.slug, score, issues };
};

const runAudit = () => {
    console.log(`\n🔍 STARTING LOCAL SEO AUDIT FOR ${SEO_KEYWORDS.length} PAGES...\n`);

    let totalScore = 0;
    let failCount = 0;
    const failures: AuditResult[] = [];

    let programmaticScore = 0;
    let programmaticCount = 0;

    SEO_KEYWORDS.forEach(k => {
        const result = checkSEO(k);
        totalScore += result.score;

        // Identify Programmatic (cities/jobs)
        const isProgrammatic = k.slug.includes('-in-') || k.slug.includes('english-for-');
        if (isProgrammatic) {
            programmaticCount++;
            programmaticScore += result.score;
        }

        if (result.score < 90) {
            failCount++;
            failures.push(result);
        }
    });

    const avgScore = totalScore / SEO_KEYWORDS.length;
    const avgProgScore = programmaticCount > 0 ? programmaticScore / programmaticCount : 0;

    console.log(`\n📊 AUDIT SUMMARY:`);
    console.log(`------------------------------`);
    console.log(`Total Pages: ${SEO_KEYWORDS.length}`);
    console.log(`Average SEO Score: ${avgScore.toFixed(1)}/100`);
    console.log(`Programmatic Pages Score: ${avgProgScore.toFixed(1)}/100 🚀`);
    console.log(`Manual Pages Score: ${((totalScore - programmaticScore) / (SEO_KEYWORDS.length - programmaticCount)).toFixed(1)}/100`);
    console.log(`------------------------------\n`);
    console.log(`Perfect Pages: ${SEO_KEYWORDS.length - failCount}`);
    console.log(`Pages needing fixes: ${failCount}`);
    console.log(`------------------------------\n`);

    if (failures.length > 0) {
        console.log(`🚩 TOP ISSUES (Showing first 5):`);
        failures.slice(0, 5).forEach(f => {
            console.log(`\n📄 Page: ${f.slug}`);
            console.log(`   Score: ${f.score}`);
            f.issues.forEach(i => console.log(`   ${i}`));
        });
    } else {
        console.log(`🎉 ALL PAGES ARE SEO KINGS! (Locally verified)`);
    }
};

runAudit();
