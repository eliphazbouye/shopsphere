import { z } from "zod";
/**
 * Example Zod schema for creating a product.
 * This is independent from Prisma models and can be adjusted as you add DB models.
 */
export declare const productCreateSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodNumber;
    currency: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    size: z.ZodOptional<z.ZodEnum<{
        XS: "XS";
        S: "S";
        M: "M";
        L: "L";
        XL: "XL";
    }>>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
