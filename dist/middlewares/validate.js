"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
/**
 * Middleware to validate request body using a Zod schema.
 * Now throws ValidationError for consistent error handling
 * Usage: app.post("/", validate(mySchema), handler)
 */
const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    }
    catch (err) {
        // Pass Zod error to error handler for consistent processing
        next(err);
    }
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map