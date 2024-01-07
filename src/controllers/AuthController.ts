import { Request, Response } from "express";
import AuthService from "../services/AuthService";

const AuthController = {
  signup: async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.signup({
        username,
        email,
        password,
      });

      res.json({ user, accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.login({
        email,
        password,
      });

      res.json({ user, accessToken, refreshToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  refresh: async (req: Request, res: Response) => {
    try {
      const { refreshToken } = req.body;
      const newAccessToken = await AuthService.refresh(refreshToken);
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: "Unauthorized: Invalid refresh token" });
    }
  },
};

export default AuthController;
