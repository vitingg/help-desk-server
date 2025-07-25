import { Request, Response } from "express";
import { ticketService } from "../../service/ticket-service";
import { CreateTicketRequestDTO } from "../../types/ticket";

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
    return res
      .status(400)
      .json({ message: error.message || "Erro desconhecido ao criar ticket." });
  }
}
