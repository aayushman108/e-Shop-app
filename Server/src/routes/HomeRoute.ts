import express from "express";
import HomeController from "../controllers/HomeController";

const router = express.Router();

router.get("/", HomeController.home);

export default router;
