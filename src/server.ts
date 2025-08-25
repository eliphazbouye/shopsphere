import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { logger } from "./utils/logger";

const PORT = process.env.APP_PORT ? Number(process.env.APP_PORT) : 4000;

app.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`, {
    action: "server_start",
    metadata: {
      port: PORT,
      environment: process.env.NODE_ENV || "development",
      logLevel: process.env.LOG_LEVEL || "info"
    }
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  logger.error('Unhandled Rejection', new Error(String(reason)), {
    action: "unhandled_rejection",
    metadata: { promise: promise.toString() }
  });
  process.exit(1);
});