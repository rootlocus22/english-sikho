# SEO & Content Strategy — EnglishGyani

This document summarizes the current SEO setup, content pillars, and recommendations for improving discoverability and rankings.

---

## 1. Current technical setup

### Global (root layout)
- **metadataBase:** `process.env.NEXT_PUBLIC_SITE_URL || 'https://www.englishgyani.com'`
- **Default metadata:** title template, description, keywords, authors, Open Graph, Twitter cards
- **Robots:** index/follow enabled; Google bot directives set
- **Verification:** Google Search Console (meta tag)
- **Structured data:** `WebSite` (with SearchAction) and `Organization` JSON-LD

### Crawlability
- **robots.txt** (`app/robots.ts`): Allows `/`, disallows `/api/`, `/dashboard/`, `/login`, `/signup`, `/_next/`, `/admin/`. Sitemap and host use **www.englishgyani.com** for consistency.
- **Sitemap** (`app/sitemap.ts`): Static pages, `/learn` (blog + programmatic topics, **deduped by URL**), `/meaning` hub + word pages, `/corporate-phrasebook`, `/phrases/*`, tools/templates/interview URLs.

### Page-level SEO
- **Learn hub (`/learn`):** Title, description, **canonical**, **Open Graph**, keywords. **“Explore by topic”** section links to programmatic topic pages (first 32 from `SEO_KEYWORDS`) for internal linking.
- **Learn [slug]:** Hybrid: markdown blog from `content/blog` first, then programmatic content from `data/seo-keywords.ts`. `generateMetadata` + FAQ schema for programmatic pages.
- **Meaning hub (`/meaning`):** Title/description use **dynamic word count** (`VERNACULAR_DICTIONARY.length`). Canonical, Open Graph, keywords.
- **Meaning [word]:** Full meta, canonical, DefinedTerm + FAQ JSON-LD.
- **Phrases [slug]:** Meta, canonical, JSON-LD; phrase list from `lib/pseo-data.ts` (e.g. 215 phrases).

---

## 2. Content pillars (programmatic & editorial)

| Pillar        | Hub              | Dynamic content source        | Approx. volume |
|---------------|------------------|--------------------------------|----------------|
| Learn         | `/learn`         | `content/blog` + `seo-keywords.ts` | Blog: by file count; Topics: ~153 |
| Dictionary    | `/meaning`       | `vernacular-dictionary.ts`     | 127+ words     |
| Phrasebook    | `/corporate-phrasebook`, `/phrases/[slug]` | `lib/pseo-data.ts` | 215 phrases |
| Tools         | —                | e.g. `/tools/self-introduction-generator` | In sitemap |
| Templates     | —                | e.g. `/templates/sick-leave-email` | In sitemap |
| Interview     | —                | e.g. `/interview/why-should-we-hire-you` | In sitemap |

---

## 3. Fixes applied (this pass)

1. **robots.txt:** Base URL and sitemap now use `https://www.englishgyani.com` (aligned with rest of site). Added `host` and disallow for `/login`, `/signup`.
2. **Sitemap:** Learn URLs deduped — topic pages from `SEO_KEYWORDS` are only added when the slug is not already present as a blog post.
3. **Learn hub:** Added `alternates.canonical`, `openGraph`, `keywords`, and an “Explore by topic” block linking to programmatic topic pages for better internal linking.
4. **Meaning hub:** Replaced hardcoded “127” with `VERNACULAR_DICTIONARY.length` everywhere; added Open Graph and absolute canonical URL.
5. **SEO strategy doc:** This document.

---

## 4. Recommendations

### 4.1 Technical
- **Canonical domain:** Ensure `NEXT_PUBLIC_SITE_URL` is set to `https://www.englishgyani.com` in production (or your chosen canonical). Redirect non-www → www (or vice versa) at host/CDN level.
- **Root layout JSON-LD:** `WebSite.potentialAction.url` uses `https://englishgyani.com/search?q=...` — consider making it use the same canonical base (e.g. `www`) if you have a search page.
- **Structured data:** Keep FAQ / DefinedTerm on programmatic pages; consider `ItemList` or `CollectionPage` on hub pages (e.g. `/learn`, `/meaning`) if it fits the content.

### 4.2 Internal linking
- **Learn:** Hub now links to a subset of topic pages; consider “Related topics” or “More guides” on individual learn pages (from `SEO_KEYWORDS` by category or similarity).
- **Meaning ↔ Phrases:** Cross-link between dictionary and phrasebook (e.g. “See also” for words that appear in phrases).
- **Tools/Templates/Interview:** Link from relevant learn topics and from the marketing homepage so these high-intent pages get more internal weight.

### 4.3 Content and keywords
- **Blog vs topics:** If a slug exists in both `content/blog` and `SEO_KEYWORDS`, the blog version is served and the topic version is excluded from the sitemap. Prefer unique slugs per URL.
- **Keyword strategy:** `seo-keywords.ts` is India-focused (e.g. “near me”, Hinglish). Expand with long-tail variants and question keywords; align titles/meta with target queries.
- **Dictionary:** As `vernacular-dictionary.ts` grows, the hub and meta stay correct thanks to the dynamic word count.

### 4.4 Monitoring
- Use Google Search Console to track indexing of `/learn/*`, `/meaning/*`, `/phrases/*` and fix any crawl errors.
- Monitor Core Web Vitals and mobile usability; programmatic pages should share the same layout and performance optimizations.

---

## 5. File reference

| Purpose           | File(s) |
|-------------------|--------|
| Global SEO        | `app/layout.tsx` |
| Robots / sitemap  | `app/robots.ts`, `app/sitemap.ts` |
| Learn hub + [slug]| `app/(marketing)/learn/page.tsx`, `app/(marketing)/learn/[slug]/page.tsx` |
| Blog data         | `lib/blog.ts`, `content/blog/` |
| Topic data        | `data/seo-keywords.ts` |
| Meaning hub + [word] | `app/(marketing)/meaning/page.tsx`, `app/(marketing)/meaning/[word]/page.tsx` |
| Dictionary data   | `data/vernacular-dictionary.ts` |
| Phrases           | `app/(marketing)/phrases/[slug]/page.tsx`, `lib/pseo-data.ts` |

---

*Last updated: March 2025 (post SEO improvements).*
