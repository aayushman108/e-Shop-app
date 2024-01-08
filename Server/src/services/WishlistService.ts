import Wishlist from "../models/Wishlist";
import NotFoundError from "../error/NotFoundError";
import ConflictError from "../error/ConflictError";

const WishlistService = {
  getUserWishlist: async (userId: string) => {
    const allWishlistProducts = await Wishlist.findAll({
      where: { userId },
      include: [{ all: true }],
    });

    if (allWishlistProducts.length === 0) {
      throw new NotFoundError("Products not found");
    }

    return allWishlistProducts;
  },

  addToWishlist: async (userId: string, productId: string) => {
    try {
      const existingProduct = await Wishlist.findOne({
        where: { userId, productId },
      });

      if (existingProduct) {
        throw new ConflictError("Product already in the Wishlist");
      }

      const newWishlistItem = await Wishlist.create({ userId, productId });

      return newWishlistItem;
    } catch (error) {
      if (error instanceof ConflictError) {
        throw error;
      } else {
        throw new Error("Failed to add product to wishlist");
      }
    }
  },

  removeFromWishlist: async (userId: string, productId: string) => {
    const existingProduct = await Wishlist.findOne({
      where: { userId, productId },
    });

    if (!existingProduct) {
      throw new NotFoundError("Product not found");
    }

    return Wishlist.destroy({
      where: { userId, productId },
    });
  },
};

export default WishlistService;
