import { PrismaClient } from "@prisma/client";
import { logger } from "../utils/logger";

export const prisma = new PrismaClient({
  log: [
    { emit: "event", level: "query" },
    { emit: "event", level: "info" },
    { emit: "event", level: "warn" },
    { emit: "event", level: "error" }
  ]
});

// Optionally attach query logging to console (development)
if (process.env.NODE_ENV === "development") {
  prisma.$on("query", (e: any) => {
    logger.databaseQuery(e.query, e.duration);
  });

  prisma.$on("error", (e: any) => {
    logger.databaseError("Prisma error", new Error(e.message));
  });
}