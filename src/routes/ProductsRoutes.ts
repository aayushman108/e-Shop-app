import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("This page displays all products");
});
router.get("/:productId", (req: Request, res: Response) => {
  res.send("This page displays single product or product details");
});

export default router;
