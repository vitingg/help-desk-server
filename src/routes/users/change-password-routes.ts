import { app } from "../../lib/app-express";
import { changePasswordController } from "../../controller/users/change-password-controller";
import { authorize } from "../../middlewares/authorize";

app.post(
  "/change-password",
  authorize(["CLIENT", "TECH"]),
  changePasswordController
);

export default app;
