import { Request, Response } from "express";
import { ticketService } from "@src/services/ticket-service";
import { CreateTicketRequestDTO } from "@src/types/ticket";
import { prisma } from "@src/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function createTicket(req: Request, res: Response) {
  const { title, description, categoryId, clientId, techId } =
    req.body as CreateTicketRequestDTO;

  if (!title || !description || !categoryId || !clientId || !techId) {
    return res.status(400).json({
      error:
        "All required fields (title, description, categoryId, clientId, techId) must be provided.",
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
    console.log("Error in create ticket", error);
    return res.status(400).json({
      message: error?.message || "Unknown error in ticket creation.",
    });
  }
}

export async function getTickets(req: Request, res: Response) {
  try {
    const tickets = await prisma.service.findMany({
      include: {
        client: {
          select: {
            id: true,
            username: true,
          },
        },
        tech: {
          select: {
            id: true,
            username: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            basePrice: true,
          },
        },
      },
    });
    res.status(200).json({ tickets: tickets });
  } catch (error) {
    console.log("Error in find services.");
    res.status(400).json({ error: error });
  }
}

export async function getTicketsById(req: Request, res: Response) {
  const { id } = req.params;
  const ticketId = Number(id);

  try {
    const existingTicket = await prisma.service.findUnique({
      where: {
        id: ticketId,
      },
    });

    if (!existingTicket) {
      res
        .status(400)
        .json({ message: "Doesn't exists any category with this Id." });
    }

    const tickets = await prisma.service.findUnique({
      where: {
        id: ticketId,
      },
      include: {
        client: {
          select: {
            id: true,
            username: true,
          },
        },
        tech: {
          select: {
            id: true,
            username: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
            basePrice: true,
          },
        },
      },
    });
    res.status(200).json({ tickets: tickets });
  } catch (error) {
    console.log("Error in find services.");
    res.status(400).json({ error: error });
  }
}

export async function deleteTickets(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const tickets = await prisma.service.delete({ where: { id: Number(id) } });
    res.status(200).json({ message: "Deleted successfully." });
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      res.status(404).json({ error: "Service not found!" });
    }
    console.log("Error in delete service.", error);
  }
}

export async function patchTicketStatus(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;
  const ticketId = Number(id);

  try {
    const existingService = await prisma.service.findUnique({
      where: {
        id: ticketId,
      },
    });

    if (!existingService) {
      throw new Error("Fail on search for service!");
    }

    const ticket = await prisma.service.update({
      where: {
        id: ticketId,
      },
      data: {
        status: status,
      },
    });
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Fail on change activities:", error);
    res.status(400).json({ error: "Error in change activities." });
  }
}
