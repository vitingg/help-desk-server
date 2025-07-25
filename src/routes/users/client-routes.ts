import {
  createClient,
  getClients,
} from "../../controller/users/client-controller";
import { validateUser } from "../../middlewares/validate-user";
import { signUpSchema } from "../../schemas-zod/schemas";
import { app } from "../../lib/app-express";

app.post("/", validateUser(signUpSchema), createClient);
app.get("/", getClients);

export default app;
