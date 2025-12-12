// Utility functions for tracking user acquisition sources

export function getAcquisitionData() {
    if (typeof window === 'undefined') return null;

    const params = new URLSearchParams(window.location.search);
    const referrer = document.referrer;

    return {
        utm_source: params.get('utm_source') || undefined,
        utm_medium: params.get('utm_medium') || undefined,
        utm_campaign: params.get('utm_campaign') || undefined,
        utm_term: params.get('utm_term') || undefined,
        utm_content: params.get('utm_content') || undefined,
        referrer: referrer || undefined,
        landingPage: window.location.href,
        signupDate: new Date()
    };
}

// Store in localStorage for later use during signup
export function storeAcquisitionData() {
    if (typeof window === 'undefined') return;

    const data = getAcquisitionData();
    if (data) {
        localStorage.setItem('acquisition_data', JSON.stringify(data));
    }
}

// Retrieve stored acquisition data
export function getStoredAcquisitionData() {
    if (typeof window === 'undefined') return null;

    const stored = localStorage.getItem('acquisition_data');
    return stored ? JSON.parse(stored) : null;
}

// Clear acquisition data after successful signup
export function clearAcquisitionData() {
    if (typeof window === 'undefined') return;

    localStorage.removeItem('acquisition_data');
}
