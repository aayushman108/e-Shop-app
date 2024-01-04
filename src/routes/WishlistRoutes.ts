import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Displays all products in wishlist");
});
router.post("/:productId", (req: Request, res: Response) => {
  res.send("Add a product into wishlist");
});
router.delete("/:productId", (req: Request, res: Response) => {
  res.send("Delete a product from wishlist");
});

export default router;
