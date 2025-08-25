import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import apiRouter from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import { apiLogger } from "./middlewares/logging";
import { logger } from "./utils/logger";
import { NotFoundError } from "./types/errors";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enhanced API logging middleware
app.use(apiLogger);

// HTTP request logging (keep morgan for HTTP-specific logs)
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

// API routes
app.use("/api", apiRouter);

// Health check
app.get("/health", (_, res) => {
  logger.info("Health check requested");
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 404 handler for unmatched routes
app.use((req, res, next) => {
  const error = new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`);
  next(error);
});

// Global error handler (must be last)
app.use(errorHandler);

export default app;