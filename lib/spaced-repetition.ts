// SM-2 inspired spaced repetition for vocabulary

export interface ReviewCard {
    wordKey: string;
    nextReview: string; // ISO date string
    interval: number; // days until next review
    easeFactor: number;
    repetitions: number;
}

const MIN_EASE = 1.3;
const INITIAL_EASE = 2.5;

export function createReviewCard(wordKey: string): ReviewCard {
    return {
        wordKey,
        nextReview: new Date().toISOString().split('T')[0],
        interval: 0,
        easeFactor: INITIAL_EASE,
        repetitions: 0,
    };
}

export function reviewWord(card: ReviewCard, quality: 'know' | 'dont_know'): ReviewCard {
    const q = quality === 'know' ? 4 : 1;

    let interval = card.interval ?? 0;
    let easeFactor = card.easeFactor ?? INITIAL_EASE;
    let repetitions = card.repetitions ?? 0;

    if (q < 3) {
        repetitions = 0;
        interval = 1;
    } else {
        if (repetitions === 0) {
            interval = 1;
        } else if (repetitions === 1) {
            interval = 3;
        } else {
            interval = Math.round(interval * easeFactor);
        }
        repetitions += 1;
    }

    easeFactor = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if (easeFactor < MIN_EASE) easeFactor = MIN_EASE;

    const today = new Date();
    const nextReview = new Date(today);
    nextReview.setDate(today.getDate() + interval);

    return {
        ...card,
        interval,
        easeFactor: Math.round(easeFactor * 100) / 100,
        repetitions,
        nextReview: nextReview.toISOString().split('T')[0],
    };
}

export function getDueWords(
    schedule: Record<string, ReviewCard>,
    allWordKeys: string[]
): string[] {
    const today = new Date().toISOString().split('T')[0];

    return allWordKeys.filter(key => {
        const card = schedule[key];
        if (!card?.nextReview) return false;
        return card.nextReview <= today;
    });
}

export function getReviewStats(schedule: Record<string, ReviewCard>) {
    const today = new Date().toISOString().split('T')[0];
    const cards = Object.values(schedule);

    const dueToday = cards.filter(c => c.nextReview <= today).length;
    const mastered = cards.filter(c => c.interval >= 21).length;
    const learning = cards.filter(c => c.interval > 0 && c.interval < 21).length;
    const newCards = cards.filter(c => c.repetitions === 0).length;

    return { dueToday, mastered, learning, newCards, total: cards.length };
}
