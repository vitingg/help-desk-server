import { Request, Response, NextFunction } from "express";
import { userServices } from "@src/services/user-service";
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
    console.log("Error in create user.");
    res.status(500).json({ error: "Error in client controller" + error });
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

export const putClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { username, email } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!existingUser) {
      throw new Error("Doesn't exists any users with this credentials.");
    }

    const emailAlreadyTaken = await prisma.user.findFirst({
      where: {
        email: email,
        id: { not: Number(id) },
      },
    });

    if (emailAlreadyTaken) {
      throw new Error("Already exists a person with this email.");
    }

    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        username: username,
        email: email,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in search client.", error);
    res.status(400).json({ error: error });
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
