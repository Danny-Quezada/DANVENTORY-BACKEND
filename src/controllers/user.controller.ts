import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { iUserInterface } from "../lib/app_core/services/all.service";
import User from "../lib/domain/models/entities/user.entities";

const setAuthCookie = (res: Response, user: User): void => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

 
  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000,
  });
};
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user: User = await iUserInterface.verifyUser(email, password);
    setAuthCookie(res, user);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  try {
    const user: User = await iUserInterface.create(
      new User(0, name, email, password, "")
    );
    setAuthCookie(res, user);
    res.status(201).send(user);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const logOut = async (req: Request, res: Response) => {
  res.clearCookie("access_token").json({ message: "Logged out successfully" });
};

export { login, signIn, logOut as signOut };
