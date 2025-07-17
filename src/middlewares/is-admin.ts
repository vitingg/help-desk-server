// Precisa passar essa verificação no middleware antes de criar de fato a conta do técnico
import { prisma } from "../lib/prisma";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const isAdmin = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "No token provieded!" });
    return;
  }

  const token = authHeader.split(" ")[1];
};
