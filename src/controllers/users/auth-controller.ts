import { Request, Response } from "express";
import { userServices } from "@src/services/user-service";
import { userRepository } from "@src/repository/user-repository";
import { prisma } from "@src/lib/prisma";

export const signInController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await userServices.signInUser({ email, password });
    const { token, newUser } = result;

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(401).json({ message: "Invalid credentials." });
  }
};

export const signOutController = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", { path: "/" });
    res.status(200).json({ message: "Logout done." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in sign-out" });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;
    const user = await userRepository.findById(userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const { password, ...userData } = user;
    res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(400).json({
      message: "Error on fetching current user",
      error: error.message,
    });
  }
};

export const putUserEmailAndUsername = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = Number(id);
  const { username, email } = req.body;

  if (!username || !email) {
    res
      .status(400)
      .json({ message: "Inform your username or email correctly!" });
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

    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: email,
        username: username,
      },
    });

    const { password, ...safeUser } = user;

    res.status(200).json(safeUser);
  } catch (error) {
    console.log("Error in update user.", error);
    res.status(400).json({ error: error });
  }
};
