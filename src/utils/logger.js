"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
// Minimal logger wrapper — replace by Winston/Pino as needed
exports.logger = {
    info: (...args) => {
        if (process.env.LOG_LEVEL !== "error") {
            // eslint-disable-next-line no-console
            console.info(...args);
        }
    },
    error: (...args) => {
        // eslint-disable-next-line no-console
        console.error(...args);
    }
};
