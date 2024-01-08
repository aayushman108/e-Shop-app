import { Request, Response, NextFunction } from "express";
import signupSchema from "../schema/UserSchema";

export const validateSignup = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = signupSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    next();
  }
};
