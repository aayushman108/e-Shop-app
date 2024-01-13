import express from "express";
import WishlistController from "../controllers/WishlistController";
import { authenticateUser } from "../middlewares/Auth";

const router = express.Router();

router.use(authenticateUser);
router.get("/:userId", WishlistController.getUserWishlist);
router.post("/:userId/:productId", WishlistController.addToWishlist);
router.delete("/:userId/:productId", WishlistController.removeFromWishlist);

export default router;
