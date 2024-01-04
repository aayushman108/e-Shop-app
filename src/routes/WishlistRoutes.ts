import express from "express";
import WishlistController from "../controllers/WishlistController";

const router = express.Router();

router.get("/", WishlistController.getUserWishlist);
router.post("/:productId", WishlistController.addToWishlist);
router.delete("/:productId", WishlistController.removeFromWishlist);

export default router;
