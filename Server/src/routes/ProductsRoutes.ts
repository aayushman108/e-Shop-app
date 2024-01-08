import express from "express";
import ProductController from "../controllers/ProductController";

const router = express.Router();

router.get("/", ProductController.getProducts);
router.get("/:productId", ProductController.getProductById);

export default router;