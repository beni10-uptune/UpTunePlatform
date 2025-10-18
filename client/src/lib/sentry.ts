import * as Sentry from "@sentry/react";

export function initSentry() {
  // Only initialize in production or if DSN is provided
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    console.log("Sentry DSN not configured - error monitoring disabled");
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,

    // Set sample rate for performance monitoring
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,

    // Enable session replay in production
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // Capture 10% of sessions for replay
    replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 0,
    replaysOnErrorSampleRate: 1.0,

    // Filter out sensitive data
    beforeSend(event) {
      // Remove auth tokens from breadcrumbs
      if (event.breadcrumbs) {
        event.breadcrumbs = event.breadcrumbs.map(breadcrumb => {
          if (breadcrumb.data?.url) {
            breadcrumb.data.url = breadcrumb.data.url.replace(/token=[^&]+/, 'token=REDACTED');
          }
          return breadcrumb;
        });
      }
      return event;
    },
  });

  console.log(`✓ Sentry error monitoring enabled (${import.meta.env.MODE})`);
}

export { Sentry };
