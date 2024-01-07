import express from "express";
import WishlistController from "../controllers/WishlistController";
import { authenticateUser } from "../middlewares/Auth";

const router = express.Router();

router.use(authenticateUser);
router.get("/", WishlistController.getUserWishlist);
router.post("/:productId", WishlistController.addToWishlist);
router.delete("/:productId", WishlistController.removeFromWishlist);

export default router;
