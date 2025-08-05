import { Request, Response, NextFunction } from "express";
import { userServices } from "@src/services/user-service";
import { prisma } from "@src/lib/prisma";

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
    console.log("Error in create techs");
    res.status(500).json({ error: "Error in tech controller" + error });
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
      include: {
        workHours: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log("Error in search techs.");
    res.status(500).json({ error: error });
  }
};

export const putTech = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { username, email } = req.body;

  if (!username) {
    throw new Error("Inform your username.");
  }
  if (!email) {
    throw new Error("Inform your email.");
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!existingUser) {
      throw new Error("Doesn't exists any techs with this credentials.");
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
        role: "TECH",
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
