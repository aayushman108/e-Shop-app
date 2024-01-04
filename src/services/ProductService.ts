import Product from "../models/Product";

const ProductService = {
  getAllProducts: async () => {
    return Product.findAll();
  },

  getProductById: async (productId: number) => {
    return Product.findByPk(productId);
  },
};

export default ProductService;
