import { validateUser } from "@src/middlewares/validate-user";
import { signInSchema } from "@src/schemas-zod/schemas";
import { app } from "@src/lib/app-express";
import {
  signInController,
  getAdmins,
} from "@controllers/users/auth-controller";

app.post("/sign-in", validateUser(signInSchema), signInController);
app.get("/sign-in", getAdmins);

export default app;
