type GTagEvent = {
    action: string;
    category: string;
    label?: string;
    value?: number;
    [key: string]: any;
};

// Log specific events via window.gtag
export const event = ({ action, category, label, value, ...rest }: GTagEvent) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
            ...rest,
        });
    }
};

// Help persist click IDs
export const setClickId = (clickId: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("click_id", clickId);
        // Also set as user property if gtag is available
        if ((window as any).gtag) {
            (window as any).gtag("set", "user_properties", {
                click_id: clickId
            });
        }
    }
};

export const getClickId = (): string | null => {
    if (typeof window !== "undefined") {
        return localStorage.getItem("click_id");
    }
    return null;
};
