import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/client";
import { logger } from "../utils/logger";
import { STATUS_CODES } from "../constants/statusCodes";
import { NotFoundError, DatabaseError } from "../types/errors";

/*
 Enhanced controller with proper error handling and logging.
 Note: prisma has no models defined because schema.prisma has no models.
 These functions are placeholders showing how you'd call Prisma and return data.
*/

export async function listProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
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
  } catch (error) {
    logger.error("Failed to fetch products", error as Error, {
      requestId: (req as any).requestId,
      action: "list_products"
    });
    
    next(new DatabaseError("Failed to fetch products", { originalError: error }));
  }
}

export async function createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
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
  } catch (error) {
    logger.error("Failed to create product", error as Error, {
      requestId: (req as any).requestId,
      action: "create_product",
      metadata: { payload: req.body }
    });
    
    next(new DatabaseError("Failed to create product", { originalError: error }));
  }
}