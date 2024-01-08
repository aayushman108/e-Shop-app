import { NextFunction, Request, Response } from "express";
import ProductService from "../services/ProductService";
import { calculateTotalPages } from "../utils/Pagination";

const ProductController = {
  getProducts: async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    try {
      const products = await ProductService.getProducts(page, pageSize);
      const totalProducts = await ProductService.getTotalProductsCount();
      const totalPages = calculateTotalPages(totalProducts, pageSize);

      res.json({
        products,
        page,
        pageSize,
        totalPages,
        totalProducts,
      });
    } catch (error) {
      next(error);
    }
  },

  getProductById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const productId = parseInt(req.params.productId, 10);
      const product = await ProductService.getProductById(productId);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },
};

export default ProductController;
