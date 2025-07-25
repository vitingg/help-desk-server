import { Request, Response, NextFunction } from "express";
import { userServices } from "../../service/user-service";
import { prisma } from "../../lib/prisma";

export const createTech = async (req: Request, res: Response) => {
  try {
    const { username, email, password, workHours } = req.body;

    const newUser = await userServices.createTechUser({
      username,
      email,
      password,
      workHours,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log("Erro ao criar o usuário");
    res.status(500).json({ error: "Erro na controller do cliente" + error });
  }
};

export const getTechs = async (
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
