
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About EnglishGyani | Our Mission and Story',
    description: 'We are on a mission to help 10 million Indian professionals master corporate English. Built by engineers and linguists to solve the MTI and fluency problem.',
    alternates: {
        canonical: '/about',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
