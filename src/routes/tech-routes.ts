import { createTech, getTechs } from "../controller/tech-controller";
import app from "./client-routes";

app.post("/tech", createTech);
app.get("/techs", getTechs);

export default app;
