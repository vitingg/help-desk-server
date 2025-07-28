import { createTech, getTechs } from "@controllers/users/tech-controller";
import { authorize } from "@src/middlewares/authorize";
import { app } from "@src/lib/app-express";

app.post("/tech", authorize(["ADMIN"]), createTech);
app.get("/techs", getTechs);

export default app;
