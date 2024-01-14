import Product from "../models/Product";
import { calculateOffset } from "../utils/Pagination";
import NotFoundError from "../error/NotFoundError";
import { IProduct } from "../interface/Product";
import { Op } from "sequelize";

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

  getProducts: async (
    page: number,
    pageSize: number,
    queryParams: { category: string; minPrice: string; maxPrice: string }
  ) => {
    const offset = calculateOffset({ page, pageSize });

    const { category, minPrice, maxPrice } = queryParams;
    console.log(queryParams);

    const where: {
      [key: string]: any;
      category?: string;
      price?: {
        [key: string]: number | undefined;
      };
    } = {};

    // Check if category is present and is a valid option
    const validCategories = ["Men Jeans", "Men Shirt", "Bags", "Women Clothes"];
    if (category && validCategories.includes(category)) {
      where.category = category;
    }

    // Check if minPrice is present and a valid number
    if (minPrice && !isNaN(parseFloat(minPrice))) {
      where.price = {
        [Op.gte]: parseFloat(minPrice),
      };
    }

    // Check if maxPrice is present and a valid number
    if (maxPrice && !isNaN(parseFloat(maxPrice))) {
      where.price = {
        ...where.price,
        [Op.lte]: parseFloat(maxPrice),
      };
    }

    const products = await Product.findAll({
      offset,
      limit: pageSize,
      where,
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

  getSearchProducts: async (query: string) => {
    const results = await Product.findAll({
      where: {
        [Op.or]: [
          { productName: { [Op.iLike]: `%${query}%` } },
          { description: { [Op.iLike]: `%${query}%` } },
          { category: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    if (results.length === 0) {
      throw new NotFoundError("Products not found");
    }

    return results;
  },
};

export default ProductService;
