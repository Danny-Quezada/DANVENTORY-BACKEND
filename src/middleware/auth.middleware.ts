import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};

export { authMiddleware };
