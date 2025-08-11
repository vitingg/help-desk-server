import { Request, Response, type NextFunction } from "express";
import { userServices } from "@src/services/user-service";
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
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error in sign-out" });
  }
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
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.log("Error on search users.");
    res.status(500).json({ error: error });
  }
};
