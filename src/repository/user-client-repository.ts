import { prisma } from "../lib/prisma";

import type { CreateUserInput } from "../service/user-client-service";

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
      },
    });
  },
};
