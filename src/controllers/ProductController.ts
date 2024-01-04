import { Request, Response } from "express";
import ProductService from "../services/ProductService";

const ProductController = {
  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await ProductService.getAllProducts();
      res.json(products);
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
