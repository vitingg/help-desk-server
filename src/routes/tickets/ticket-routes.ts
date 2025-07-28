import { app } from "@src/lib/app-express";
import {
  ticketController,
  getTickets,
  deleteTickets,
} from "@controllers/tickets/ticket-controller";

app.post("/service", ticketController);
app.get("/service", getTickets);
app.delete("/service/:id", deleteTickets);

export default app;
