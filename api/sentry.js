let Sentry = null;
if (process.env.SENTRY_DSN) {
  Sentry = require("@sentry/node");
  Sentry.init({
    dsn: process.env.SENTRY_DSN
  });
}

const logError = Sentry ? Sentry.captureMessage : console.error;
const logException = Sentry ? Sentry.captureException : console.error;

module.exports = {
  logError,
  logException
};
