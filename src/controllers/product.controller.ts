import { Request, Response } from "express";
import { logger } from "../utils/logger";
import { STATUS_CODES } from "../constants/statusCodes";

export async function listProducts(req: Request, res: Response): Promise<void> {
  const requestId = (req as any).requestId;

  logger.info("Fetching products list", {
    requestId,
    action: "list_products"
  });

  // Example using prisma - if you add a Product model remove the type `any`.
  // const items = await prisma.product.findMany();
  const items: any[] = [];

  logger.info("Products list fetched successfully", {
    requestId,
    action: "list_products",
    metadata: { count: items.length }
  });

  res.status(STATUS_CODES.OK.code).json({
    data: items,
    message: STATUS_CODES.OK.message
  });
}

export async function createProduct(req: Request, res: Response): Promise<void> {
  const requestId = (req as any).requestId;
  const payload = req.body as unknown as Record<string, unknown>;

  logger.info("Creating new product", {
    requestId,
    action: "create_product",
    metadata: { productName: payload.name }
  });

  // Example validation already done in middleware; here we would map to Prisma create
  // const created = await prisma.product.create({ data: payload as any });
  const created = { id: "tmp-id", ...payload };

  logger.info("Product created successfully", {
    requestId,
    action: "create_product",
    metadata: { productId: created.id, productName: payload.name }
  });

  res.status(STATUS_CODES.CREATED.code).json({
    data: created,
    message: STATUS_CODES.CREATED.message
  });
}