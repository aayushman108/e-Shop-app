import { Request, Response } from "express";
import WishlistService from "../services/WishlistService";

const WishlistController = {
  getUserWishlist: async (req: Request, res: Response) => {
    try {
      const userId = +req.params.userId;
      const wishlist = await WishlistService.getUserWishlist(userId);
      res.json(wishlist);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  addToWishlist: async (req: Request, res: Response) => {
    try {
      const userId = +req.params.userId;
      const productId = +req.params.productId;
      await WishlistService.addToWishlist(userId, productId);
      res.json({ message: "Product added to wishlist successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  removeFromWishlist: async (req: Request, res: Response) => {
    try {
      const userId = +req.params.userId;
      const productId = +req.params.productId;
      await WishlistService.removeFromWishlist(userId, productId);
      res.json({ message: "Product removed from wishlist successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default WishlistController;
