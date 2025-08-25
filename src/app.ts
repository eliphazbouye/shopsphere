import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import apiRouter from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

// API routes
app.use("/api", apiRouter);

// Health check
app.get("/health", (_, res) => res.json({ status: "ok" }));

// Global error handler
app.use(errorHandler);

export default app;