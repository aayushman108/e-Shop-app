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
    const productCount = await Product.count();

    if (!productCount) {
      throw new NotFoundError("Products not found");
    }

    return productCount;
  },

  getProductById: async (productId: number) => {
    const singleProduct = await Product.findByPk(productId);

    if (!singleProduct) {
      throw new NotFoundError("Product not found");
    }

    return singleProduct;
  },
};

export default ProductService;
