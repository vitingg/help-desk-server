import type { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export const ticketRepository = {
  create: async (data: Prisma.ServiceCreateInput) => {
    return prisma.service.create({
      data,
    });
  },
};

export const categoryRepository = {
  findById: async (id: number) => {
    return prisma.category.findUnique({
      where: { id },
    });
  },
};

export const clientRepository = {
  findById: async (id: number) => {
    return prisma.user.findUnique({
      where: { id, role: "CLIENT" },
    });
  },
};

export const techRepository = {
  findById: async (id: number) => {
    return prisma.user.findUnique({
      where: { id, role: "TECH" },
    });
  },
};
