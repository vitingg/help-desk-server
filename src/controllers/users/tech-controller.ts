import { Request, Response, NextFunction } from "express";
import { userServices } from "@src/services/user-service";
import { prisma } from "@src/lib/prisma";
import { cloudinary } from "@src/lib/cloudinary";

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
    res.status(400).json({ error: "Error in tech controller" + error });
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
  const { username, email, workHours } = req.body;
  const image = req.file;
  const userId = Number(id);

  if (!username || !email) {
    res
      .status(400)
      .json({ message: "Inform your username or email correctly!" });
  }

  const workHoursArray = typeof workHours === "string" ? JSON.parse(workHours) : workHours;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!existingUser) {
      res
        .status(400)
        .json({ message: "Doesn't exists any techs with this credentials." });
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
        folder: "tech_profile_pictures",
      });
      imageUrl = result.secure_url;
    }

    const user = await prisma.user.update({
      where: {
        id: userId,
        role: "TECH",
      },
      data: {
        username: username,
        email: email,
        workHours: {
          update: {
            workTime: workHoursArray,
          },
        },
        profilePicture: imageUrl,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in search client.", error);
    res.status(400).json({ error: error });
  }
};

export const deleteTech = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
