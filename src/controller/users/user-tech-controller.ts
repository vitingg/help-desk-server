import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { createUserSchema } from "../../middlewares/schemas";

export const createUserTech = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = createUserSchema.parse(req.body);

    const user = await prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: data.email,
        role: "TECH",
      },
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
    console.log("Erro ao criar o usuário");
    res.status(500).json({ error: error });
  }
};

export const getAllTechs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "TECH",
      },
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
    console.log("Erro ao buscar usuários");
    res.status(500).json({ error: error });
  }
};
