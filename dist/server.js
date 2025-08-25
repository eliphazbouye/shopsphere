"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const logger_1 = require("./utils/logger");
const PORT = process.env.APP_PORT ? Number(process.env.APP_PORT) : 4000;
app_1.default.listen(PORT, () => {
    logger_1.logger.info(`Server listening on http://localhost:${PORT}`, {
        action: "server_start",
        metadata: {
            port: PORT,
            environment: process.env.NODE_ENV || "development",
            logLevel: process.env.LOG_LEVEL || "info"
        }
    });
});
// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger_1.logger.error('Uncaught Exception', error);
    process.exit(1);
});
// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger_1.logger.error('Unhandled Rejection', new Error(String(reason)), {
        action: "unhandled_rejection",
        metadata: { promise: promise.toString() }
    });
    process.exit(1);
});
//# sourceMappingURL=server.js.map