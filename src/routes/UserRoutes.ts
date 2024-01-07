import express from "express";
import AuthController from "../controllers/AuthController";
import { validateSignup } from "../middlewares/SchemaValidator";

const router = express.Router();

router.post("/signup", validateSignup, AuthController.signup);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);

export default router;
