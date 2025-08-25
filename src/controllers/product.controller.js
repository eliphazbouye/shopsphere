"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listProducts = listProducts;
exports.createProduct = createProduct;
/*
 Controller skeletons. Replace with real logic and error handling.
 Note: prisma has no models defined because schema.prisma has no models.
 These functions are placeholders showing how you'd call Prisma and return data.
*/
async function listProducts(req, res) {
    // Example using prisma - if you add a Product model remove the type `any`.
    // const items = await prisma.product.findMany();
    const items = [];
    res.json({ data: items });
}
async function createProduct(req, res) {
    const payload = req.body;
    // Example validation already done in middleware; here we would map to Prisma create
    // const created = await prisma.product.create({ data: payload as any });
    const created = { id: "tmp-id", ...payload };
    res.status(201).json({ data: created });
}
