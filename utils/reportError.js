import * as Sentry from "@sentry/node";

export default function reportError(error, feature) {
  Sentry.setTag("feature", feature);
  Sentry.captureException(error);
};