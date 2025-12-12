"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { setClickId } from "@/lib/analytics";

function AnalyticsTrackerContent() {
    const searchParams = useSearchParams();

    useEffect(() => {
        // List of params to capture
        const clickId = searchParams.get("click_id") || searchParams.get("gclid");
        const utmSource = searchParams.get("utm_source");

        if (clickId) {
            setClickId(clickId);
        }

        // You could also persist UTMs here if needed
        if (utmSource) {
            sessionStorage.setItem("utm_source", utmSource);
        }
    }, [searchParams]);

    return null;
}

export default function AnalyticsTracker() {
    return (
        <Suspense fallback={null}>
            <AnalyticsTrackerContent />
        </Suspense>
    );
}
