"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const validate_1 = require("../middlewares/validate");
const productSchema_1 = require("../schemas/productSchema");
const router = (0, express_1.Router)();
/**
 * Example endpoints:
 *  - GET /api/products
 *  - POST /api/products
 *
 * These are basic skeletons; extend logic + access control as needed.
 */
router.get("/", product_controller_1.listProducts);
router.post("/", (0, validate_1.validate)(productSchema_1.productCreateSchema), product_controller_1.createProduct);
exports.default = router;
