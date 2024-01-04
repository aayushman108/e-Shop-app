import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Displays all products in cart");
});
router.post("/:productId", (req: Request, res: Response) => {
  res.send("Add a product into card");
});
router.put("/:productId", (req: Request, res: Response) => {
  res.send("Update a product into cart");
});
router.delete("/:productId", (req: Request, res: Response) => {
  res.send("Delete a product from cart");
});

export default router;
