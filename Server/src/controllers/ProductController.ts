import { NextFunction, Request, Response } from "express";
import ProductService from "../services/ProductService";
import { calculateTotalPages } from "../utils/Pagination";
import HttpStatus from "http-status-codes";

const ProductController = {
  createProduct: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productName, description, price, stockQuantity, category } =
        req.body;

      const file = req.file;
      if (!file) return res.status(400).send("No image in the request");

      const fileName = file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

      const productData = {
        productName,
        description,
        price,
        stockQuantity,
        imageUrl: `${basePath}${fileName}`,
        category,
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
    const category = req.query.category as string;
    const maxPrice = req.query.maxPrice as string;
    const minPrice = req.query.minPrice as string;

    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 8;

    try {
      const products = await ProductService.getProducts(page, pageSize, {
        category,
        minPrice,
        maxPrice,
      });
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
      const productId = req.params.productId;
      const product = await ProductService.getProductById(productId);
      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  getSearchResults: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { query } = req.query;
      if (!query) {
        return res.status(400).json({ error: "Query parameter is required." });
      }

      const searchResult = await ProductService.getSearchProducts(
        query as string
      );
      res.json(searchResult);
    } catch (error) {
      next(error);
    }
  },
};

export default ProductController;
