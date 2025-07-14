import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { createUserSchema } from "../../middlewares/schemas";

// Criar conta do tipo técnico exige um middleware de verificação de quem está criando a conta
// Visto que somente admin pode criar conta de técnico

export const createUserClient = async (
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
      },
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
    console.log("Erro ao criar o usuário");
    res.status(500).json({ error: error });
  }
};

export const getAllClients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "CLIENT",
      },
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
    console.log("Erro ao buscar usuários");
    res.status(500).json({ error: error });
  }
};
