import { NextFunction, Request, Response } from "express";
import CartService from "../services/CartService";
import HttpStatus from "http-status-codes";

const CartController = {
  getUserCart: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const cart = await CartService.getUserCart(userId);
      return res.json(cart);
    } catch (error) {
      next(error);
    }
  },

  addToCart: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
      await CartService.addToCart(userId, productId);
      res
        .status(HttpStatus.OK)
        .json({ message: "Product added to cart successfully" });
    } catch (error) {
      next(error);
    }
  },

  updateCart: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
      const quantity = parseInt(req.body.quantity, 10);
      await CartService.updateCart(userId, productId, quantity);
      res.status(HttpStatus.OK).json({ message: "Cart updated successfully" });
    } catch (error) {
      next(error);
    }
  },

  removeFromCart: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const productId = req.params.productId;
      await CartService.removeFromCart(userId, productId);
      res
        .status(HttpStatus.OK)
        .json({ message: "Product removed from cart successfully" });
    } catch (error) {
      next(error);
    }
  },
};

export default CartController;
