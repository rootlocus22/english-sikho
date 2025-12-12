# Feature Access Control - Usage Guide

## Overview

The feature-gating system allows you to control access to features based on user subscription tiers (Free, Starter, Pro).

## Quick Start

### 1. Check Feature Access in Components

```tsx
import { useFeatureAccess } from '@/hooks/useFeatureAccess';
import { FEATURES } from '@/lib/features';

function MyComponent() {
    const { hasAccess, needsUpgrade, requiredTier } = useFeatureAccess(
        FEATURES.INTERVIEW_PREP
    );
    
    if (!hasAccess) {
        return <UpgradePrompt tier={requiredTier} />;
    }
    
    return <InterviewPrepContent />;
}
```

### 2. Wrap Components with FeatureGate

```tsx
import { FeatureGate } from '@/components/FeatureGate';
import { FEATURES } from '@/lib/features';

function MyPage() {
    return (
        <FeatureGate feature={FEATURES.SPEAKING_COACH_ADVANCED}>
            <AdvancedSpeakingCoach />
        </FeatureGate>
    );
}
```

The gate will automatically show an upgrade prompt if the user doesn't have access.

### 3. Add Pro/Starter Badges

```tsx
import { ProBadge, StarterBadge } from '@/components/FeatureGate';

<h2>
    Advanced Features <ProBadge />
</h2>
```

## Available Features

### Free Tier
- ✅ Basic Translator
- ✅ Tone Rewriter
- ✅ Email Decoder
- ❌ 3 sessions/day limit

### Starter Tier (₹149/mo)
- ✅ All Free features
- ✅ Speaking Coach (Basic)
- ✅ Practice Gym
- ✅ Email Templates
- ✅ Email Support
- ✅ Unlimited Sessions

### Pro Tier (₹299/mo)
- ✅ All Starter features
- ✅ Advanced Speaking Coach
- ✅ Pronunciation Analysis
- ✅ Business Templates
- ✅ Interview Preparation
- ✅ Roleplay Scenarios
- ✅ Progress Analytics
- ✅ Priority Support

## Examples

### Example 1: Conditional UI

```tsx
import { useFeatureAccess, FEATURES } from '@/hooks/useFeatureAccess';

function Dashboard() {
    const interviewPrep = useFeatureAccess(FEATURES.INTERVIEW_PREP);
    
    return (
        <div>
            {interviewPrep.hasAccess ? (
                <InterviewSection />
            ) : (
                <div>
                    <Lock /> Interview Prep - Upgrade to Pro
                </div>
            )}
        </div>
    );
}
```

### Example 2: Button with Feature Check

```tsx
import { useFeatureGate } from '@/hooks/useFeatureAccess';
import { FEATURES } from '@/lib/features';

function PracticeButton() {
    const { hasAccess, requestAccess } = useFeatureGate(
        FEATURES.PRACTICE_GYM
    );
    
    const handleClick = () => {
        if (!hasAccess) {
            requestAccess(); // Opens paywall
            return;
        }
        // Start practice
    };
    
    return (
        <Button onClick={handleClick}>
            Start Practice
        </Button>
    );
}
```

### Example 3: Custom Fallback

```tsx
<FeatureGate 
    feature={FEATURES.BUSINESS_TEMPLATES}
    fallback={
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p>Business templates available in Pro plan!</p>
            <Link href="/pricing">View Plans</Link>
        </div>
    }
>
    <BusinessTemplatesList />
</FeatureGate>
```

### Example 4: Disable Upgrade Prompt

```tsx
<FeatureGate 
    feature={FEATURES.ROLEPLAY_SCENARIOS}
    showUpgradePrompt={false}
>
    <RoleplayContent />
</FeatureGate>
```

## Adding New Features

### Step 1: Add to FEATURES constant

```typescript
// lib/features.ts
export const FEATURES = {
    // ... existing features
    NEW_FEATURE: 'new_feature',
} as const;
```

### Step 2: Add to tier configuration

```typescript
export const TIER_FEATURES = {
    pro: [
        // ... existing features
        FEATURES.NEW_FEATURE,
    ],
};
```

### Step 3: Add metadata

```typescript
export const FEATURE_META = {
    [FEATURES.NEW_FEATURE]: {
        name: 'New Feature',
        description: 'Description of the feature',
        requiredTier: 'pro',
    },
};
```

### Step 4: Use in components

```tsx
<FeatureGate feature={FEATURES.NEW_FEATURE}>
    <NewFeatureComponent />
</FeatureGate>
```

## Backend Validation

For API routes, check feature access server-side:

```typescript
// app/api/some-route/route.ts
import { hasFeatureAccess } from '@/lib/features';

export async function POST(req: Request) {
    const { userId } = await req.json();
    const userData = await getUserData(userId);
    
    const userTier = userData.isPremium ? 'pro' : 'free';
    
    if (!hasFeatureAccess(userTier, FEATURES.INTERVIEW_PREP)) {
        return NextResponse.json({
            error: 'This feature requires Pro subscription',
            needsUpgrade: true
        }, { status: 403 });
    }
    
    // Process request...
}
```

## Best Practices

1. **Always validate server-side** - Don't rely only on client checks
2. **Show clear upgrade paths** - Make it obvious how to unlock features
3. **Test all tiers** - Ensure free users see prompts, paid users see features
4. **Use badges** - Mark pro features clearly in UI
5. **Graceful degradation** - Provide value at every tier

## Troubleshooting

**Q: Feature gate not working?**
- Check if user's tier is correctly set in Firestore
- Verify feature is in TIER_FEATURES config
- Ensure useUserStore has latest data

**Q: How to test different tiers?**
- Update `isPremium` and `subscription.tier` in Firestore
- Use React DevTools to check useUserStore state

**Q: Can I gate parts of a feature?**
- Yes! Use multiple feature constants for different capabilities
- Example: SPEAKING_COACH_BASIC vs SPEAKING_COACH_ADVANCED
