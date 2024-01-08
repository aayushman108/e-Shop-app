import HttpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import AuthService from "../services/AuthService";

const AuthController = {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.signup({
        username,
        email,
        password,
      });

      return res.status(HttpStatus.CREATED).json({
        message: "Signed up successfully",
        user,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.login({
        email,
        password,
      });

      return res.status(HttpStatus.CREATED).json({
        message: "Logged in successfully",
        user,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const newAccessToken = await AuthService.refresh(refreshToken);
      res.json({ accessToken: newAccessToken });
    } catch (error) {
      next(error);
    }
  },
};

export default AuthController;
