import express from "express";
import { Request, Response } from "express";

const router = express.Router();

router.post("/signup", (req: Request, res: Response) => {
  res.send("User signup");
});
router.post("/login", (req: Request, res: Response) => {
  res.send("User login");
});

export default router;
