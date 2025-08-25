// Minimal logger wrapper — replace by Winston/Pino as needed
export const logger = {
  info: (...args: any[]) => {
    if (process.env.LOG_LEVEL !== "error") {
      // eslint-disable-next-line no-console
      console.info(...args);
    }
  },
  error: (...args: any[]) => {
    // eslint-disable-next-line no-console
    console.error(...args);
  }
};