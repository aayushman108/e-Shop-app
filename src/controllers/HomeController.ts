import { Request, Response } from "express";

const HomeController = {
  home: (req: Request, res: Response) => {
    res.send("Welcome to the Home Page!");
  },
};

export default HomeController;
