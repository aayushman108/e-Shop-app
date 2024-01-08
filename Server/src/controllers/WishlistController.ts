import { NextFunction, Request, Response } from "express";
import WishlistService from "../services/WishlistService";
import HttpStatus from "http-status-codes";

const WishlistController = {
  getUserWishlist: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const wishlist = await WishlistService.getUserWishlist(userId);
      res.json(wishlist);
    } catch (error) {
      next(error);
    }
  },

  addToWishlist: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
      await WishlistService.addToWishlist(userId, productId);
      res
        .status(HttpStatus.OK)
        .json({ message: "Product added to wishlist successfully" });
    } catch (error) {
      next(error);
    }
  },

  removeFromWishlist: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
      await WishlistService.removeFromWishlist(userId, productId);
      res
        .status(HttpStatus.OK)
        .json({ message: "Product removed from wishlist successfully" });
    } catch (error) {
      next(error);
    }
  },
};

export default WishlistController;
