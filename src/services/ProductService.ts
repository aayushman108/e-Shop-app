import Product from "../models/Product";
import { calculateOffset } from "../utils/Pagination";
import NotFoundError from "../error/NotFoundError";

const ProductService = {
  getProducts: async (page: number, pageSize: number) => {
    const offset = calculateOffset({ page, pageSize });

    const products = await Product.findAll({
      offset,
      limit: pageSize,
    });

    if (!products) {
      throw new NotFoundError("Products not found");
    }

    return products;
  },

  getTotalProductsCount: async () => {
    return Product.count();
  },

  getProductById: async (productId: number) => {
    const singleProdct = await Product.findByPk(productId);

    if (!singleProdct) {
      throw new NotFoundError("Product not found");
    }
  },
};

export default ProductService;
