import { z } from "zod";

/**
 * Example Zod schema for creating a product.
 * This is independent from Prisma models and can be adjusted as you add DB models.
 */
export const productCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  currency: z.string().length(3).optional().default("USD"),
  size: z.enum(["XS", "S", "M", "L", "XL"]).optional(),
  tags: z.array(z.string()).optional()
});