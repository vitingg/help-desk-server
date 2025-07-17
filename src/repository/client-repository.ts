import { prisma } from "../lib/prisma";

import type { CreateUserInput } from "../service/client-service";

export const userClientRepository = {
  create: async ({ username, email, password }: CreateUserInput) => {
    return prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
  },

  findByEmail: async (email: string) => {
    return prisma.user.findMany({
      where: {
        email,
        // email tem que ser igual email do user que esteja tentado criar a conta
        // provavelmente where email: user.email
      },
    });
  },
};
