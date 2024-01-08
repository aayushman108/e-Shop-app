import Cart from "../models/Cart";
import NotFoundError from "../error/NotFoundError";
import ConflictError from "../error/ConflictError";

const CartService = {
  getUserCart: async (userId: string) => {
    const allCartProducts = await Cart.findAll({
      where: { userId },
      include: [{ all: true }],
    });

    if (allCartProducts.length === 0) {
      throw new NotFoundError("Products not found");
    }

    return allCartProducts;
  },

  addToCart: async (userId: string, productId: string) => {
    try {
      const existingProduct = await Cart.findOne({
        where: { userId, productId },
      });

      if (existingProduct) {
        throw new ConflictError("Product already in the cart");
      }

      const newCartItem = await Cart.create({ userId, productId });

      return newCartItem;
    } catch (error) {
      if (error instanceof ConflictError) {
        throw error;
      } else {
        throw new Error("Failed to add product to cart");
      }
    }
  },

  updateCart: async (userId: string, productId: string, quantity: number) => {
    const existingProduct = await Cart.findOne({
      where: { userId, productId },
    });

    if (!existingProduct) {
      throw new NotFoundError("Product not found");
    }

    return Cart.update({ quantity }, { where: { userId, productId } });
  },

  removeFromCart: async (userId: string, productId: string) => {
    const existingProduct = await Cart.findOne({
      where: { userId, productId },
    });

    if (!existingProduct) {
      throw new NotFoundError("Product not found");
    }

    return Cart.destroy({
      where: { userId, productId },
    });
  },
};

export default CartService;
