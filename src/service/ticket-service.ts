import { CreateTicketRequestDTO } from "@src/types/ticket";
import {
  ticketRepository,
  categoryRepository,
  categoryExists,
  createCategory,
} from "@repository/ticket-repository";
import {
  clientRepository,
  techRepository,
} from "src/repository/user-repository";
import { prisma } from "@src/lib/prisma";

export async function ticketService(data: CreateTicketRequestDTO) {
  const { title, description, categoryId, clientId, techId } = data;

  const categoryExists = await categoryRepository.findById(categoryId);
  const clientExists = await clientRepository.findById(clientId);
  const techExists = await techRepository.findById(techId);

  if (!categoryExists) {
    throw new Error("Category not founded!");
  }
  if (!clientExists) {
    throw new Error("Client not founded!");
  }
  if (!techExists) {
    throw new Error("Technician not founded!");
  }

  const currentService = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  const serviceData = {
    title: title.trim(),
    description: description?.trim() || "",
    category: {
      connect: { id: categoryId },
    },
    client: {
      connect: { id: clientId },
    },
    tech: {
      connect: { id: techId },
    },
  };
  const service = await ticketRepository.create(serviceData);
  const addService = { service, currentService };

  return addService;
}

export interface ICreateCategoriesServiceInterface {
  name: string;
  basePrice: number;
}

export const createCategoriesService = async ({
  name,
  basePrice,
}: ICreateCategoriesServiceInterface) => {
  try {
    const existsCategory = await categoryExists.findFirst(name);
    if (existsCategory) {
      throw new Error("Already exists one category with this name.");
    }
  } catch (error) {
    console.log("Error in ticket service.", error);
  }

  const creatingCategory = await createCategory.create({
    name,
    basePrice,
  });

  return creatingCategory;
};
