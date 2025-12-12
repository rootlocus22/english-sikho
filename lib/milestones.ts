// Milestone definitions for achievement certificates

export interface Milestone {
    id: string;
    name: string;
    description: string;
    icon: string;
    requirement: {
        sessions?: number;
        streak?: number;
        averageScore?: number;
    };
    tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export const MILESTONES: Record<string, Milestone> = {
    first_steps: {
        id: 'first_steps',
        name: 'First Steps',
        description: 'Complete your first 10 AI practice sessions',
        icon: '🎯',
        requirement: { sessions: 10 },
        tier: 'bronze'
    },
    practice_champion: {
        id: 'practice_champion',
        name: 'Practice Champion',
        description: 'Complete 50 AI practice sessions',
        icon: '🏆',
        requirement: { sessions: 50 },
        tier: 'silver'
    },
    fluency_master: {
        id: 'fluency_master',
        name: 'Fluency Master',
        description: 'Complete 100 AI practice sessions',
        icon: '👑',
        requirement: { sessions: 100 },
        tier: 'gold'
    },
    streak_hero: {
        id: 'streak_hero',
        name: '30-Day Streak Hero',
        description: 'Practice English for 30 consecutive days',
        icon: '🔥',
        requirement: { streak: 30 },
        tier: 'gold'
    },
    week_warrior: {
        id: 'week_warrior',
        name: '7-Day Streak',
        description: 'Practice for 7 days in a row',
        icon: '⚡',
        requirement: { streak: 7 },
        tier: 'bronze'
    },
    grammar_pro: {
        id: 'grammar_pro',
        name: 'Grammar Pro',
        description: 'Achieve 90%+ average score in speaking coach',
        icon: '📝',
        requirement: { averageScore: 90 },
        tier: 'platinum'
    },
    dedication_star: {
        id: 'dedication_star',
        name: 'Dedication Star',
        description: 'Complete 200 practice sessions',
        icon: '⭐',
        requirement: { sessions: 200 },
        tier: 'platinum'
    }
};

// Check which milestones a user has achieved
export function checkMilestones(userData: {
    totalSessionsUsed?: number;
    currentStreak?: number;
    averageScore?: number;
}): { achieved: string[]; progress: Record<string, number> } {
    const achieved: string[] = [];
    const progress: Record<string, number> = {};

    const totalSessions = userData.totalSessionsUsed || 0;
    const currentStreak = userData.currentStreak || 0;
    const averageScore = userData.averageScore || 0;

    Object.values(MILESTONES).forEach(milestone => {
        const req = milestone.requirement;

        if (req.sessions) {
            const progressPct = Math.min((totalSessions / req.sessions) * 100, 100);
            progress[milestone.id] = Math.round(progressPct);

            if (totalSessions >= req.sessions) {
                achieved.push(milestone.id);
            }
        } else if (req.streak) {
            const progressPct = Math.min((currentStreak / req.streak) * 100, 100);
            progress[milestone.id] = Math.round(progressPct);

            if (currentStreak >= req.streak) {
                achieved.push(milestone.id);
            }
        } else if (req.averageScore) {
            const progressPct = Math.min((averageScore / req.averageScore) * 100, 100);
            progress[milestone.id] = Math.round(progressPct);

            if (averageScore >= req.averageScore) {
                achieved.push(milestone.id);
            }
        }
    });

    return { achieved, progress };
}

// Get tier color
export function getTierColor(tier: string): string {
    const colors: Record<string, string> = {
        bronze: 'from-orange-600 to-amber-600',
        silver: 'from-slate-400 to-slate-600',
        gold: 'from-yellow-400 to-yellow-600',
        platinum: 'from-purple-500 to-indigo-600'
    };
    return colors[tier] || 'from-gray-400 to-gray-600';
}

// Get tier badge color
export function getTierBadgeColor(tier: string): string {
    const colors: Record<string, string> = {
        bronze: 'bg-orange-100 text-orange-700 border-orange-300',
        silver: 'bg-slate-100 text-slate-700 border-slate-300',
        gold: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        platinum: 'bg-purple-100 text-purple-700 border-purple-300'
    };
    return colors[tier] || 'bg-gray-100 text-gray-700 border-gray-300';
}
