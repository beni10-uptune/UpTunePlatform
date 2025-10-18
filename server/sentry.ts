import * as Sentry from "@sentry/node";

export function initSentry() {
  // Only initialize in production or if DSN is provided
  if (!process.env.SENTRY_DSN) {
    console.log("Sentry DSN not configured - error monitoring disabled");
    return;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",

    // Set sample rate for performance monitoring
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

    // Filter out sensitive data
    beforeSend(event) {
      // Remove sensitive headers
      if (event.request?.headers) {
        delete event.request.headers['authorization'];
        delete event.request.headers['cookie'];
      }
      return event;
    },
  });

  console.log(`✓ Sentry error monitoring enabled (${process.env.NODE_ENV})`);
}

export { Sentry };
