import express, { Request, Response } from "express";
import UserService from "../services/UserService";

const UserController = {
  signup: async (req: Request, res: Response) => {
    try {
      const { username, email, password } = req.body;
      const user = await UserService.signup(username, email, password);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default UserController;
