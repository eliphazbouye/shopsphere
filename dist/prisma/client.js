"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
const logger_1 = require("../utils/logger");
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
        logger_1.logger.databaseQuery(e.query, e.duration);
    });
    exports.prisma.$on("error", (e) => {
        logger_1.logger.databaseError("Prisma error", new Error(e.message));
    });
}
//# sourceMappingURL=client.js.map