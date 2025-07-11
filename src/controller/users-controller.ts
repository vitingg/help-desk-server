import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Ter uma controller que cria usuário do tipo cliente e do tipo técnico
// Criar conta do tipo técnico exige um middleware de verificação de quem está criando a conta
// Visto que somente admin pode criar conta de técnico

export const createUserClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, password } = req.body;

  try {
    const user = prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    const userWithoutPassword = {
      username: user.name,
      email: user.email,
    };
  } catch (error) {
    next(error);
    console.log("Erro ao criar o usuário");
  }
};

export const createUserTech = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = prisma.user.create({
      data: {
        username: req.body,
        email: req.body,
        password: req.body,
        role: "TECH",
      },
    });
    const userWithoutPassword = {
      username: user.username,
      email: user.email,
    };
  } catch (error) {
    next(error);
    console.log("Erro ao criar o usuário");
  }
};
