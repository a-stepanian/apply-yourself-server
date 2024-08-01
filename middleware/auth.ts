import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  user: any;
}

export interface IRequestWithUser extends Request {
  user?: any;
}

// Middleware function
function auth(req: IRequestWithUser, res: Response, next: NextFunction): void {
  try {
    // Get the token from cookies
    const token = req.cookies.token;
    if (!token) {
      throw new Error("Token not found from request cookies");
    }

    // Verify the token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const verified = jwt.verify(token, secret) as TokenPayload;
    req.user = verified.user;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

export default auth;
