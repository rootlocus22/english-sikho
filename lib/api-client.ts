// Helper function to make authenticated API calls with userId header
import { useUserStore } from "./store";

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const { userId } = useUserStore.getState();

    const headers = new Headers(options.headers);
    if (userId) {
        headers.set('x-user-id', userId);
    }

    return fetch(url, {
        ...options,
        headers,
    });
}

// Hook version for use in components
export function useFetchWithAuth() {
    const { userId } = useUserStore();

    return async (url: string, options: RequestInit = {}) => {
        const headers = new Headers(options.headers);
        if (userId) {
            headers.set('x-user-id', userId);
        }

        return fetch(url, {
            ...options,
            headers,
        });
    };
}
