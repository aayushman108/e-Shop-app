import express from "express";
import ProductController from "../controllers/ProductController";
import upload from "../utils/Multer";

const router = express.Router();

router.post("/upload", upload.single("image"), ProductController.createProduct);
router.get("/", ProductController.getProducts);
router.get("/:productId", ProductController.getProductById);

export default router;
