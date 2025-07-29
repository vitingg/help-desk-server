import { Request, Response, NextFunction } from "express";
import { userServices } from "@src/service/user-service";
import { prisma } from "@src/lib/prisma";

export const createClient = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await userServices.createClientUser({
      username,
      email,
      password,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log("Erro ao criar o usuário");
    res.status(500).json({ error: "Erro na controller do cliente" + error });
  }
};

export const getClients = async (
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
    console.log("Error in search client.");
    res.status(500).json({ error: error });
  }
};

export const deleteClients = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userTickets = await prisma.service.deleteMany({
      where: {
        clientId: Number(id),
      },
    });

    if (!userTickets) {
      throw new Error("Doesn't have any user with this ticket.");
    }

    const user = await prisma.user.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    if (error === "P2025") {
      res.status(404).json({ error: "User not found!" });
    }
    console.log("Error in delete client.", error);
    res.status(500).json({ error: error });
  }
};
