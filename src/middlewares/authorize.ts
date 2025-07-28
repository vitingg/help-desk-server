import { Request, Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

export interface AuthenticatedRequest extends Request {
  user?: TokenPayload;
}

export const authorize = (allowedRoles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: "No token provided!" });
      return;
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
      res.status(401).json({ message: "Wrong token!" });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      res.status(401).json({ message: "Badly formatted token" });
      return;
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.AUTH_SECRET
      ) as TokenPayload;
      if (!allowedRoles.includes(decoded.role)) {
        res.status(403).json({ message: "Access denied. Without permission" });
        return;
      }
      req.user = decoded;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Invalid or expired Token" });
    }
  };
};
