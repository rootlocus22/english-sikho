
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing - EnglishGyani | Affordable AI English Coaching',
    description: 'Start learning English for free. Upgrade for unlimited AI practice, interview preparation, and business templates. 97% cheaper than coaching institutes.',
    alternates: {
        canonical: '/pricing',
    },
};

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
