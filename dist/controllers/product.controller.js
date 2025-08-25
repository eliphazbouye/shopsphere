"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProducts = listProducts;
exports.createProduct = createProduct;
const logger_1 = require("../utils/logger");
const statusCodes_1 = require("../constants/statusCodes");
const errors_1 = require("../types/errors");
/*
 Enhanced controller with proper error handling and logging.
 Note: prisma has no models defined because schema.prisma has no models.
 These functions are placeholders showing how you'd call Prisma and return data.
*/
async function listProducts(req, res, next) {
    try {
        const requestId = req.requestId;
        logger_1.logger.info("Fetching products list", {
            requestId,
            action: "list_products"
        });
        // Example using prisma - if you add a Product model remove the type `any`.
        // const items = await prisma.product.findMany();
        const items = [];
        logger_1.logger.info("Products list fetched successfully", {
            requestId,
            action: "list_products",
            metadata: { count: items.length }
        });
        res.status(statusCodes_1.STATUS_CODES.OK.code).json({
            data: items,
            message: statusCodes_1.STATUS_CODES.OK.message
        });
    }
    catch (error) {
        logger_1.logger.error("Failed to fetch products", error, {
            requestId: req.requestId,
            action: "list_products"
        });
        next(new errors_1.DatabaseError("Failed to fetch products", { originalError: error }));
    }
}
async function createProduct(req, res, next) {
    try {
        const requestId = req.requestId;
        const payload = req.body;
        logger_1.logger.info("Creating new product", {
            requestId,
            action: "create_product",
            metadata: { productName: payload.name }
        });
        // Example validation already done in middleware; here we would map to Prisma create
        // const created = await prisma.product.create({ data: payload as any });
        const created = { id: "tmp-id", ...payload };
        logger_1.logger.info("Product created successfully", {
            requestId,
            action: "create_product",
            metadata: { productId: created.id, productName: payload.name }
        });
        res.status(statusCodes_1.STATUS_CODES.CREATED.code).json({
            data: created,
            message: statusCodes_1.STATUS_CODES.CREATED.message
        });
    }
    catch (error) {
        logger_1.logger.error("Failed to create product", error, {
            requestId: req.requestId,
            action: "create_product",
            metadata: { payload: req.body }
        });
        next(new errors_1.DatabaseError("Failed to create product", { originalError: error }));
    }
}
//# sourceMappingURL=product.controller.js.map