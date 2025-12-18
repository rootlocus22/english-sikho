
import { SEO_KEYWORDS } from '../data/seo-keywords';

console.log(`Total SEO Keywords: ${SEO_KEYWORDS.length}`);

// Check specific programmatic keywords
const cityKeyword = SEO_KEYWORDS.find(k => k.slug.includes('english-speaking-course-in-new-delhi'));
if (cityKeyword) {
    console.log('✅ Found New Delhi City Keyword:', cityKeyword.title);
} else {
    console.error('❌ New Delhi City Keyword NOT FOUND');
}

const delhiKeyword = SEO_KEYWORDS.find(k => k.slug.includes('english-speaking-course-in-delhi'));
if (delhiKeyword) {
    console.log('✅ Found Delhi City Keyword:', delhiKeyword.title);
} else {
    console.error('❌ Delhi City Keyword NOT FOUND');
}

const jobKeyword = SEO_KEYWORDS.find(k => k.slug.includes('english-for-software-engineer'));
if (jobKeyword) {
    console.log('✅ Found Software Engineer Keyword:', jobKeyword.title);
} else {
    console.error('❌ Software Engineer Keyword NOT FOUND');
}

// Check for malformed slugs
const malformed = SEO_KEYWORDS.filter(k => k.slug.includes(' - '));
if (malformed.length > 0) {
    console.error(`❌ Found ${malformed.length} malformed slugs with spaces!`);
    console.log('Sample:', malformed[0].slug);
} else {
    console.log('✅ No malformed slugs found.');
}
