import app from "./client-routes";
import { ticketController } from "../controller/ticket-controller";

app.post("/service", ticketController);

export default app;
