import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/ui/tracked-elements";

interface BrandLogoProps {
    /** Size variant for the logo */
    size?: "sm" | "md" | "lg";
    /** Custom height class (overrides size) */
    className?: string;
    /** Whether to use Next.js Image component or regular img */
    useNextImage?: boolean;
    /** Show text alongside logo */
    showText?: boolean;
    /** Link destination (defaults to home page) */
    href?: string;
    /** Custom event tracking data */
    eventData?: {
        action: string;
        category: string;
        label: string;
    };
}

const sizeClasses = {
    sm: "h-12",
    md: "h-16",
    lg: "h-20",
};

export default function BrandLogo({
    size = "md",
    className,
    useNextImage = false,
    showText = false,
    href = "/",
    eventData,
}: BrandLogoProps) {
    const heightClass = className || sizeClasses[size];
    const logoSrc = "/englishgyanilogo.png?v=3";

    const logoImage = useNextImage ? (
        <Image
            src={logoSrc}
            alt="EnglishGyani - Business English for Indians"
            width={200}
            height={100}
            className={`${heightClass} w-auto`}
            priority
            unoptimized
        />
    ) : (
        <img
            src={logoSrc}
            alt="EnglishGyani"
            className={`${heightClass} w-auto object-contain`}
        />
    );

    const content = showText ? (
        <>
            {logoImage}
            <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                <span className="truncate font-semibold text-base">EnglishGyani</span>
                <span className="truncate text-xs">AI Coach</span>
            </div>
        </>
    ) : (
        logoImage
    );

    // Use TrackedLink if eventData is provided, otherwise regular Link
    const linkClassName = showText
        ? "flex items-center hover:opacity-90 transition-opacity w-full py-2"
        : "flex items-center hover:opacity-90 transition-opacity";

    if (eventData) {
        return (
            <TrackedLink
                href={href}
                className={linkClassName}
                eventData={eventData}
            >
                {content}
            </TrackedLink>
        );
    }

    return (
        <Link href={href} className={linkClassName}>
            {content}
        </Link>
    );
}
