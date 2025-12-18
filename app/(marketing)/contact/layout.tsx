
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | EnglishGyani Support',
    description: 'Need help? Contact our support team for any queries regarding subscriptions, features, or partnership opportunities. We usually reply within 24 hours.',
    alternates: {
        canonical: '/contact',
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
