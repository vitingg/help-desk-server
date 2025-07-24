import {
  ticketRepository,
  categoryRepository,
  clientRepository,
  techRepository,
} from "../repository/ticket-repository";
import { CreateTicketRequestDTO } from "../types/ticket";

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

  return service;
}
