import { Router } from "express";
import productsRouter from "./products";

const router: Router = Router();

router.use("/products", productsRouter);

export default router;
