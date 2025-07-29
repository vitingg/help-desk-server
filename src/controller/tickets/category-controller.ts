import { Request, Response } from "express";
import { prisma } from "@src/lib/prisma";
import { createCategoriesService } from "@src/service/ticket-service";

export const createCategories = async (req: Request, res: Response) => {
  const { name, basePrice } = req.body;

  try {
    const createCategories = await createCategoriesService({
      name,
      basePrice,
    });
    res.status(201).json({ message: "Create successfully category." });
  } catch (error) {
    console.log("Error in create categories.", error);
  }
};

export const getCategories = async (req: Request, res: Response) => {
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
