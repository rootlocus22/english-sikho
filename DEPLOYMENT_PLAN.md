# Deployment Plan — EnglishGyani Updates

**Date:** March 8, 2025  
**Status:** Ready for push after review

---

## Test Results Summary

| Check | Status |
|-------|--------|
| TypeScript (`tsc --noEmit`) | ✅ Pass |
| Production Build (`npm run build`) | ✅ Pass |
| ESLint | ⚠️ Pre-existing issues (474 total); no new critical errors in changed files |

---

## Changes Overview

### 1. Premium Feature Access Fix (Critical)
**Problem:** Premium users could not access Interview Prep, Analytics, or Certificates.

**Root cause:** `subscription` was never passed to the store when loading user data.

**Files changed:**
- `app/dashboard/layout.tsx` — Include `subscription` when setting userData (auth + Firestore listener)
- `app/(auth)/login/page.tsx` — Include `subscription` when setting userData on login
- `lib/store.ts` — `hasFeature()` now treats `isPremium` without `subscription` as Pro (fallback)

### 2. Speaking Coach Enhancements
**Features:** Accent analysis + accent preview (hear text in US/UK/Indian/Australian accents)

**Files changed:**
- `app/api/ai/speaking-coach/route.ts` — AI now returns `accentAnalysis` (detected influence, accent score, MTI patterns, tips)
- `components/SpeakingCoach.tsx` — Accent preview panel, accent analysis card, play-in-accent buttons

### 3. WhatsApp & Support Contact
**Files changed:**
- `components/Navbar.tsx`, `Footer.tsx`, `app-sidebar.tsx`
- `app/(marketing)/contact/page.tsx`, `terms/page.tsx`, `privacy/page.tsx`, `refund-policy/page.tsx`
- Support: `info@nyquisttech.com`, WhatsApp `+91 84312 56903`

### 4. Learning Experience Improvements (from prior session)
- **Progress sync** — `lib/progress-sync.ts`, `lib/learner-profile.ts`, `lib/spaced-repetition.ts`
- **Firestore rules** — Subcollection access for `activity`, `progress`
- **AI coach** — Learner profile context, `history` guard
- **Daily Goals** — Auto-track from Firestore activity
- **MTI Drills** — Real speech analysis via AI
- **Certificates** — Real analytics data
- **ThinkingInEnglish, CommonMistakesTracker, EmailCourse** — AI feedback
- **Vocabulary** — Spaced repetition
- **DailyWordChallenge** — Merge dailyWord, `onKeyDown` fix

---

## Files to Commit

### Modified (29 files)
```
app/(auth)/login/page.tsx
app/(marketing)/contact/page.tsx
app/(marketing)/meaning/[word]/page.tsx
app/(marketing)/page.tsx
app/(marketing)/privacy/page.tsx
app/(marketing)/refund-policy/page.tsx
app/(marketing)/terms/page.tsx
app/api/ai/coach/route.ts
app/api/ai/speaking-coach/route.ts
app/dashboard/certificates/page.tsx
app/dashboard/email-course/[lessonId]/page.tsx
app/dashboard/grammar-basics/[lessonId]/page.tsx
app/dashboard/interview-prep/page.tsx
app/dashboard/layout.tsx
app/dashboard/page.tsx
app/dashboard/vocabulary/[categoryId]/page.tsx
components/ChatSimulator.tsx
components/CommonMistakesTracker.tsx
components/DailyGoals.tsx
components/DailyWordChallenge.tsx
components/Footer.tsx
components/MTIDrills.tsx
components/Navbar.tsx
components/QuickReference.tsx
components/SpeakingCoach.tsx
components/ThinkingInEnglish.tsx
components/app-sidebar.tsx
firestore.rules
lib/store.ts
```

### New (3 files)
```
lib/learner-profile.ts
lib/progress-sync.ts
lib/spaced-repetition.ts
```

---

## Push Checklist

- [ ] Review `DEPLOYMENT_PLAN.md` (this file)
- [ ] Run `npm run build` locally (already passed)
- [ ] Run `npx tsc --noEmit` (already passed)
- [ ] Deploy Firestore rules: `firebase deploy --only firestore:rules`
- [ ] Commit and push

---

## Suggested Commit & Push Commands

```bash
# Stage all changes
git add -A

# Commit with descriptive message
git commit -m "feat: premium feature access fix, accent analysis, WhatsApp support, learning improvements

- Fix: Premium users can now access Interview Prep, Analytics, Certificates (subscription was not passed to store)
- Feat: Speaking Coach accent analysis (MTI patterns, accent score) + hear text in US/UK/IN/AU accents
- Feat: WhatsApp support (8431256903), support email info@nyquisttech.com
- Feat: Progress sync, learner profile, spaced repetition for vocabulary
- Feat: AI feedback for ThinkingInEnglish, CommonMistakes, EmailCourse
- Fix: Daily Goals auto-track, MTI real speech analysis, certificates real data
- Fix: Various bugs (progress-sync, coach route, DailyWordChallenge merge)"

# Push to remote
git push origin main
```

---

## Post-Deploy Verification

1. **Premium access:** Log in as a premium user → visit `/dashboard/interview-prep`, `/dashboard/analytics`, `/dashboard/certificates` → all should load (no upgrade prompt).
2. **Speaking Coach:** Visit `/dashboard/coach` → speak → verify accent analysis card and accent preview buttons appear.
3. **WhatsApp:** Click WhatsApp link in header/footer → should open chat with +91 84312 56903.
4. **Firestore rules:** Ensure `firestore.rules` is deployed if not already.

---

## Rollback (if needed)

```bash
git revert HEAD
git push origin main
```

Or revert to a specific commit if issues arise.
