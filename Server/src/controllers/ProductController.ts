import { NextFunction, Request, Response } from "express";
import ProductService from "../services/ProductService";
import { calculateTotalPages } from "../utils/Pagination";
import HttpStatus from "http-status-codes";

const ProductController = {
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productName, description, price, stockQuantity } = req.body;

      // Multer middleware will add the "file" property to the request
      if (!req.file) {
        return res.status(400).json({ error: "No image provided!" });
      }

      const imageUrl = req.file.path;

      const productData = {
        productName,
        description,
        price,
        stockQuantity,
        imageUrl,
      };

      const product = await ProductService.createProduct(productData);

      res
        .status(HttpStatus.OK)
        .json({ message: "Product created successfully", product });
    } catch (error) {
      next(error);
    }
  },

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
