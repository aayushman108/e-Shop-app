import { Request, Response } from "express";
import ProductService from "../services/ProductService";
import { calculateTotalPages } from "../utils/Pagination";

const ProductController = {
  getProducts: async (req: Request, res: Response) => {
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
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getProductById: async (req: Request, res: Response) => {
    try {
      const productId = parseInt(req.params.productId, 10);
      const product = await ProductService.getProductById(productId);
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default ProductController;
