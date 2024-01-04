import { Request, Response } from "express";
import CartService from "../services/CartService";

const CartController = {
  getUserCart: async (req: Request, res: Response) => {
    try {
      const userId = +req.params.userId;
      const cart = await CartService.getUserCart(userId);
      res.json(cart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  addToCart: async (req: Request, res: Response) => {
    try {
      const userId = +req.params.userId;
      const productId = +req.params.productId;
      await CartService.addToCart(userId, productId);
      res.json({ message: "Product added to cart successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateCart: async (req: Request, res: Response) => {
    try {
      const userId = +req.params.userId;
      const productId = +req.params.productId;
      const quantity = parseInt(req.body.quantity, 10);
      await CartService.updateCart(userId, productId, quantity);
      res.json({ message: "Cart updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  removeFromCart: async (req: Request, res: Response) => {
    try {
      const userId = +req.params.userId;
      const productId = +req.params.productId;
      await CartService.removeFromCart(userId, productId);
      res.json({ message: "Product removed from cart successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default CartController;
