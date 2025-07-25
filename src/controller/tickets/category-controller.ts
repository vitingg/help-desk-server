import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const categoryController = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        basePrice: true,
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    res.status(500).json({ error: "Erro interno ao buscar categorias" });
  }
};
