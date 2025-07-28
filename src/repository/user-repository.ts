import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const userRepository = {
  create: async (data: Prisma.UserCreateInput) => {
    return prisma.user.create({
      data,
    });
  },

  findByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  },

  findById: async (id: number) => {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  },

  changePassword: async (id: number, newPassword: string) => {
    return prisma.user.update({
      where: { id },
      data: { password: newPassword },
    });
  },
};
