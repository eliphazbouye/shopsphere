"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCreateSchema = void 0;
const zod_1 = require("zod");
/**
 * Example Zod schema for creating a product.
 * This is independent from Prisma models and can be adjusted as you add DB models.
 */
exports.productCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().nonnegative(),
    currency: zod_1.z.string().length(3).optional().default("USD"),
    size: zod_1.z.enum(["XS", "S", "M", "L", "XL"]).optional(),
    tags: zod_1.z.array(zod_1.z.string()).optional()
});
