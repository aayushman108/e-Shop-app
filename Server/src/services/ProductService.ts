import Product from "../models/Product";
import { calculateOffset } from "../utils/Pagination";
import NotFoundError from "../error/NotFoundError";
import { IProduct } from "../interface/Product";

const ProductService = {
  createProduct: async (productData: IProduct) => {
    try {
      const {
        productName,
        description,
        price,
        stockQuantity,
        imageUrl,
        category,
      } = productData;
      const product = await Product.create({
        productName,
        description,
        price,
        stockQuantity,
        imageUrl,
        category,
      });
      return product;
    } catch (error) {
      console.log(error);
      throw new Error("Error adding product");
    }
  },

  getProducts: async (page: number, pageSize: number) => {
    const offset = calculateOffset({ page, pageSize });

    const products = await Product.findAll({
      offset,
      limit: pageSize,
    });

    if (products.length === 0) {
      throw new NotFoundError("Products not found");
    }

    return products;
  },

  getTotalProductsCount: async () => {
    const productCount = await Product.count();

    if (productCount === 0) {
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
