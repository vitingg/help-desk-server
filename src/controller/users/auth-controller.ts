import { Request, Response, type NextFunction } from "express";
import { userServices } from "@src/service/user-service"; 
import { prisma } from "@src/lib/prisma"

export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await userServices.signInUser({ email, password });
    res.status(200).json(result);
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(401).json({ message: "Credenciais inválidas" });
  }
  res.status(500).json({ message: "Internal error." });
};

export const getAdmins = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: "ADMIN",
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log("Erro ao buscar usuários");
    res.status(500).json({ error: error });
  }
};
