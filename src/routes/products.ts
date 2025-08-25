import { Router } from "express";
import { createProduct, listProducts } from "../controllers/product.controller";
import { validate } from "../middlewares/validate";
import { productCreateSchema } from "../schemas/productSchema";

const router = Router();

/**
 * Example endpoints:
 *  - GET /api/products
 *  - POST /api/products
 *
 * These are basic skeletons; extend logic + access control as needed.
 */

router.get("/", listProducts);
router.post("/", validate(productCreateSchema), createProduct);

export default router;