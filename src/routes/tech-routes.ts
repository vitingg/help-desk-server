import { createUserTech, getAllTechs } from "../controller/tech-controller";
import { app } from "../lib/app-express";

app.post("/tech", createUserTech);
app.get("/tech", getAllTechs);
