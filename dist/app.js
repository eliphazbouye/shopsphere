"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const logging_1 = require("./middlewares/logging");
const logger_1 = require("./utils/logger");
const errors_1 = require("./types/errors");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Enhanced API logging middleware
app.use(logging_1.apiLogger);
// HTTP request logging (keep morgan for HTTP-specific logs)
if (process.env.NODE_ENV !== "test") {
    app.use((0, morgan_1.default)("combined"));
}
// API routes
app.use("/api", routes_1.default);
// Health check
app.get("/health", (_, res) => {
    logger_1.logger.info("Health check requested");
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
// 404 handler for unmatched routes
app.use((req, res, next) => {
    const error = new errors_1.NotFoundError(`Route ${req.method} ${req.originalUrl} not found`);
    next(error);
});
// Global error handler (must be last)
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map