import express from "express";
import CartController from "../controllers/CartController";
import { authenticateUser } from "../middlewares/Auth";

const router = express.Router();

router.use(authenticateUser);
router.get("/:userId", CartController.getUserCart);
router.post("/:userId/:productId", CartController.addToCart);
router.put("/:userId/:productId", CartController.updateCart);
router.delete("/:userId/:productId", CartController.removeFromCart);

export default router;
