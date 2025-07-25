import app from "../users/client-routes";
import { ticketController } from "../../controller/tickets/ticket-controller";

app.post("/service", ticketController);

export default app;
