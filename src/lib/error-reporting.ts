/**
 * Generic error reporter for the React error boundary.
 * Extend this to integrate with Sentry, Datadog, or any other
 * error-tracking service you choose.
 */
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  // Log to console in all environments for now.
  // Replace / extend with your error-tracking SDK call here.
  console.error("[ErrorBoundary]", error, context);
}
