import { PrismaClient } from "@prisma/client";

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
  prisma.$on("query", (e) => {
    // eslint-disable-next-line no-console
    console.log("Prisma query:", e.query);
  });
}