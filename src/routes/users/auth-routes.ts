import {
  signInController,
  getAdmins,
} from "../../controller/users/auth-controller";
import { validateUser } from "../../middlewares/validate-user";
import { signInSchema } from "../../schemas-zod/schemas";
import app from "./client-routes";

app.post("/sign-in", validateUser(signInSchema), signInController);
app.get("/sign-in", getAdmins);

export default app;
