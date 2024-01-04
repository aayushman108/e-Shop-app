import Cart from "../models/Cart";

const CartService = {
  getUserCart: async (userId: number) => {
    return Cart.findAll({
      where: { userId },
      include: [{ all: true }],
    });
  },

  addToCart: async (userId: number, productId: number) => {
    return Cart.create({ userId, productId });
  },

  updateCart: async (userId: number, productId: number, quantity: number) => {
    return Cart.update({ quantity }, { where: { userId, productId } });
  },

  removeFromCart: async (userId: number, productId: number) => {
    return Cart.destroy({
      where: { userId, productId },
    });
  },
};

export default CartService;
