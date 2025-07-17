import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";

interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export const userTechServices = {
  createUser: async ({ username, email, password }: CreateUserInput) => {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      throw new Error("Este e-mail já esta em uso!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "TECH",
      },
    });
    return user;
  },
};
