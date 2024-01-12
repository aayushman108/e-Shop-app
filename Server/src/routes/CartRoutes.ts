import express from "express";
import CartController from "../controllers/CartController";
import { authenticateUser } from "../middlewares/Auth";

const router = express.Router();

router.use(authenticateUser);
router.get("/:userId", CartController.getUserCart);
router.post("/", CartController.addToCart);
router.put("/:productId", CartController.updateCart);
router.delete("/:productId", CartController.removeFromCart);

export default router;
