import { app } from "@src/lib/app-express";
import { changePasswordController } from "@src/controller/users/change-password-controller";
import { authorize } from "@src/middlewares/authorize";

app.post(
  "/change-password",
  authorize(["CLIENT", "TECH"]),
  changePasswordController
);

export default app;
