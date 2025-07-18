import { createTech, getTechs } from "../controller/tech-controller";
import { authorize } from "../middlewares/authorize";
import app from "./client-routes";

app.post("/tech", authorize(["ADMIN"]), createTech);
app.get("/techs", getTechs);

export default app;
