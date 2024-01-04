import express from "express";
import CartController from "../controllers/CartController";

const router = express.Router();

router.get("/", CartController.getUserCart);
router.post("/:productId", CartController.addToCart);
router.put("/:productId", CartController.updateCart);
router.delete("/:productId", CartController.removeFromCart);

export default router;
