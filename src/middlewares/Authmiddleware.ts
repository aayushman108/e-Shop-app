// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { serverConfig } from "../config/config";

const secretKey = serverConfig.jwt.accessTokenSecret;

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check for the presence of the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Access token is missing" });
  }

  try {
    // Verify the access token
    const decoded: any = jwt.verify(token, secretKey);

    // Fetch the user from the database
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: Invalid user" });
    }

    // Attach the decoded user information to the request object
    (req as Request & { user: User }).user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid access token" });
  }
};
