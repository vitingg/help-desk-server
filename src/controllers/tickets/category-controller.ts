import { Request, Response } from "express";
import { prisma } from "@src/lib/prisma";
import { createCategoriesService } from "@src/services/ticket-service";

export const createCategories = async (req: Request, res: Response) => {
  const { name, basePrice } = req.body;
  try {
    const createCategories = await createCategoriesService({
      name,
      basePrice,
    });
    res.status(201).json(createCategories);
  } catch (error) {
    console.log("Error in create categories.", error);
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({});
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error on search all categories:", error);
    res.status(400).json({ error: "Error on search all categories." });
  }
};

export const clientGetCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error on client get categories:", error);
    res.status(400).json({ error: "Error on search client get categories." });
  }
};

export const putToggleActivities = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const existingCategory = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingCategory) {
      throw new Error("Fail on search for category!");
    }

    const categories = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        isActive: !existingCategory.isActive,
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Fail on change activities:", error);
    res.status(400).json({ error: "Error in change activities." });
  }
};

export const putChangeNameOrPrice = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, basePrice } = req.body;
  try {
    const existingCategory = await prisma.category.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!existingCategory) {
      throw new Error("Fail on search for category!");
    }

    const categories = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name: name,
        basePrice: basePrice,
      },
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Fail on change activities:", error);
    res.status(400).json({ error: "Error in change activities." });
  }
};

export const deleteCategories = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const response = await prisma.category.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
