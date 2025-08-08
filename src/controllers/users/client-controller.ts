import { Request, Response, NextFunction } from "express";
import { userServices } from "@src/services/user-service";
import { prisma } from "@src/lib/prisma";
import { cloudinary } from "@src/lib/cloudinary";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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
  const image = req.file;
  const userId = Number(id);

  if (isNaN(userId)) {
    return res.status(400).json({ message: "User Id is invalid." });
  }

  if (!username || !email) {
    res
      .status(400)
      .json({ message: "Username and email are obligatory.." });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existingUser) {
      res
        .status(400)
        .json({ message: "Doesn't exists any users with this credentials." });
    }

    const emailAlreadyTaken = await prisma.user.findFirst({
      where: {
        email: email,
        id: { not: userId },
      },
    });

    if (emailAlreadyTaken) {
      res
        .status(409)
        .json({ message: "Already exists a person with this email." });
    }

    let imageUrl = existingUser.profilePicture;
    if (image) {
      const base64Image = `data:${
        image.mimetype
      };base64,${image.buffer.toString("base64")}`;

      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "client_profile_pictures",
      });

      imageUrl = result.secure_url;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        email,
        profilePicture: imageUrl,
      },
    });
    res.status(200).json({ message: "Update user!", user: updatedUser });
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
      console.log("Deleting user with no services.");
    }

    const user = await prisma.user.delete({ where: { id: Number(id) } });
    res.status(200).json(user);
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      res.status(404).json({ error: "User not found!" });
    }
    console.log("Error in delete client.", error);
  }
};
