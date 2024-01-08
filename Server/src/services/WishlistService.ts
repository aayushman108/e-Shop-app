import Wishlist from "../models/Wishlist";

const WishlistService = {
  getUserWishlist: async (userId: number) => {
    return Wishlist.findAll({
      where: { userId },
      include: [{ all: true }],
    });
  },

  addToWishlist: async (userId: number, productId: number) => {
    return Wishlist.create({ userId, productId });
  },

  removeFromWishlist: async (userId: number, productId: number) => {
    return Wishlist.destroy({
      where: { userId, productId },
    });
  },
};

export default WishlistService;
