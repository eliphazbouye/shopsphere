"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient({
    log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" }
    ]
});
// Optionally attach query logging to console (development)
if (process.env.NODE_ENV === "development") {
    exports.prisma.$on("query", (e) => {
        // eslint-disable-next-line no-console
        console.log("Prisma query:", e.query);
    });
}
