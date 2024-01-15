import express from "express";
import AuthController from "../controllers/AuthController";
import { validateSignup } from "../middlewares/SchemaValidator";
import { authenticateUser } from "../middlewares/Auth";

const router = express.Router();

router.post("/signup", validateSignup, AuthController.signup);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", authenticateUser, AuthController.logout);

export default router;
