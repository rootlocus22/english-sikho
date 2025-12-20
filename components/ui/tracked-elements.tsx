"use client";

import Link from "next/link";
import { Button, ButtonProps } from "@/components/ui/button";
import { event } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnalyticsEvent {
    action: string;
    category: string;
    label?: string;
    value?: number;
}

interface TrackedLinkProps extends React.ComponentProps<typeof Link> {
    eventData: AnalyticsEvent;
    children: ReactNode;
}

export function TrackedLink({ eventData, onClick, children, ...props }: TrackedLinkProps) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        event(eventData);
        if (onClick) onClick(e);
    };

    return (
        <Link {...props} onClick={handleClick}>
            {children}
        </Link>
    );
}

interface TrackedButtonProps extends ButtonProps {
    eventData: AnalyticsEvent;
}

export function TrackedButton({ eventData, onClick, className, ...props }: TrackedButtonProps) {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        event(eventData);
        if (onClick) onClick(e);
    };

    return (
        <Button {...props} onClick={handleClick} className={className} />
    );
}
