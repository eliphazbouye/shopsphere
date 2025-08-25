"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
/**
 * Middleware to validate request body using a Zod schema.
 * Usage: app.post("/", validate(mySchema), handler)
 */
const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    }
    catch (err) {
        // Zod throws a ZodError; send 400 with details
        return res.status(400).json({ error: err.errors || err.message });
    }
};
exports.validate = validate;
