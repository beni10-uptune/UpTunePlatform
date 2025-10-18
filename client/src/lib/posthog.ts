import posthog from 'posthog-js';

export function initPostHog() {
  const apiKey = import.meta.env.VITE_POSTHOG_API_KEY;
  const host = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

  if (!apiKey) {
    console.log("PostHog API key not configured - analytics disabled");
    return;
  }

  posthog.init(apiKey, {
    api_host: host,
    person_profiles: 'identified_only',

    // Capture pageviews automatically
    capture_pageview: true,
    capture_pageleave: true,

    // Enable session recording in production
    session_recording: {
      maskAllInputs: true,
      maskTextSelector: '[data-sensitive]',
    },

    // Respect Do Not Track
    respect_dnt: true,

    // Disable in development by default
    opt_in_site_apps: import.meta.env.PROD,

    // Privacy-friendly settings
    sanitize_properties: (properties, event) => {
      // Remove sensitive data
      const sanitized = { ...properties };
      delete sanitized.password;
      delete sanitized.token;
      delete sanitized.api_key;
      return sanitized;
    },
  });

  console.log(`✓ PostHog analytics enabled (${import.meta.env.MODE})`);
}

export { posthog };
