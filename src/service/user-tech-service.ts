import { prisma } from "../lib/prisma";

interface CreateUserInput {
  username: string;
  email: string;
  password: string;
}

export const userTechServices = {
  createUser: async ({ username, email, password }: CreateUserInput) => {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
        role: "TECH",
      },
    });
    return user;
  },
};
