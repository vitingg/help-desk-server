import { Request, Response } from "express";
import { ticketService } from "@src/services/ticket-service";
import { CreateTicketRequestDTO } from "@src/types/ticket";
import { prisma } from "@src/lib/prisma";

export async function ticketController(req: Request, res: Response) {
  const { title, description, categoryId, clientId, techId } =
    req.body as CreateTicketRequestDTO;

  if (!title || !description || !categoryId || !clientId || !techId) {
    return res.status(400).json({
      error:
        "Todos os campos obrigatórios (title, description, categoryId, clientId, techId) devem ser fornecidos.",
    });
  }

  try {
    const ticket = await ticketService({
      title,
      description,
      categoryId,
      clientId,
      techId,
    });

    return res.status(201).json(ticket);
  } catch (error) {
    console.log("Erro ao criar o ticket", error);
    return res.status(400).json({
      message: error?.message || "Erro desconhecido ao criar ticket.",
    });
  }
}

export async function getTickets(req: Request, res: Response) {
  try {
    const tickets = await prisma.service.findMany();
    res.status(200).json(tickets);
  } catch (error) {
    console.log("Error in find services.");
    res.status(500).json({ error: error });
  }
}

export const deleteTickets = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const tickets = await prisma.service.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Deleted successfully." });
  } catch (error) {
    if (error === "P2025") {
      res.status(404).json({ error: "Service not found!" });
    }
    console.log("Error in delete service.");
    res.status(500).json({ error: error });
  }
};
