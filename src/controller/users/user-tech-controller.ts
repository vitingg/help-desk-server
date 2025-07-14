import { Request, Response, NextFunction } from "express";
import { userTechServices } from "../../service/user-tech-service";
import { prisma } from "../../lib/prisma";

// Criar conta do tipo técnico exige um middleware de verificação de quem está criando a conta
// Visto que somente admin pode criar conta de técnico

export const createUserTech = async (
  req: Request,
  res: Response,
) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await userTechServices.createUser({
      username,
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (error) {
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
    console.log("Erro ao buscar usuários");
    res.status(500).json({ error: error });
  }
};
