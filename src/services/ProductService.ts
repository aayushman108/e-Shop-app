import Product from "../models/Product";
import { calculateOffset } from "../utils/Pagination";

const ProductService = {
  getProducts: async (page: number, pageSize: number) => {
    const offset = calculateOffset({ page, pageSize });

    return Product.findAll({
      offset,
      limit: pageSize,
    });
  },

  getTotalProductsCount: async () => {
    return Product.count();
  },

  getProductById: async (productId: number) => {
    return Product.findByPk(productId);
  },
};

export default ProductService;
