import { useAuth } from '../contexts/AuthContext';

/**
 * Hook to make authenticated fetch requests with Supabase token
 */
export function useAuthenticatedFetch() {
  const { session } = useAuth();

  return async (url: string, options: RequestInit = {}) => {
    const headers = new Headers(options.headers || {});

    // Add authorization header if we have a session
    if (session?.access_token) {
      headers.set('Authorization', `Bearer ${session.access_token}`);
    }

    // Add content-type for JSON requests
    if (options.body && typeof options.body === 'string') {
      headers.set('Content-Type', 'application/json');
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    return response;
  };
}
