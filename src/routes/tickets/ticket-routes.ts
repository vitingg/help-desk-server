import { app } from "@src/lib/app-express";
import {
  createTicket,
  getTickets,
  deleteTickets,
  patchTicketStatus,
  getTicketsById,
} from "@controllers/tickets/ticket-controller";

/**
 * @openapi
 * /service:
 *   post:
 *     tags:
 *       - Service
 *     summary: Cria um novo serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: "#/components/schemas/Service"
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 *       400:
 *         description: Erro ao criar um serviço
 *       401:
 *         description: Não autorizado
 */
app.post("/services", createTicket);

/**
 * @openapi
 * /service:
 *   get:
 *     tags:
 *       - Service
 *     summary: Lista todos os serviços
 *     responses:
 *       200:
 *         description: Serviços retornados com sucesso
 *       401:
 *         description: Não autorizado
 */
app.get("/services", getTickets);

// Também precisa de swagger.
app.get("/services/:id", getTicketsById);

// precisa do swagger
app.patch("/services/:id/change-status", patchTicketStatus);

/**
 * @openapi
 * /service/{id}:
 *   delete:
 *     summary: Deleta um serviço existente
 *     description: Remove um serviço do sistema com base no ID fornecido.
 *     tags:
 *       - Service
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do service a ser deletado
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       204:
 *         description: Categoria deletada com sucesso (sem conteúdo).
 *       404:
 *         description: Categoria não encontrada.
 *       500:
 *         description: Erro interno do servidor.
 */
app.delete("/services/:id", deleteTickets);

export default app;
