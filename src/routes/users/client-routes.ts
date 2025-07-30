import { validateUser } from "@src/middlewares/validate-user";
import { signUpSchema } from "@src/schemas-zod/schemas";
import { app } from "@src/lib/app-express";
import {
  createClient,
  getClients,
  putClient,
  deleteClients,
} from "@controllers/users/client-controller";

app.post("/clients", validateUser(signUpSchema), createClient);
app.get("/clients", getClients);
app.put("/client/:id", putClient);
app.delete("/clients/:id", deleteClients);

export default app;
