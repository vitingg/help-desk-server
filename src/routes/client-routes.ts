import { createClient, getClients } from "../controller/client-controller";
import { app } from "../lib/app-express";
import { validateUser } from "../middlewares/validate-user";
import { createUserSchema } from "../schemas-zod/schemas";

app.post("/", validateUser(createUserSchema), createClient);
app.get("/", getClients);

export default app;
