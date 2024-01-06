import { Request, Response } from "express";
import AuthService from "../services/AuthService";

const AuthController = {
  signup: async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.signup(
        username,
        email,
        password
      );

      res.json({ user, accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.login(
        email,
        password
      );

      res.json({ user, accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default AuthController;
