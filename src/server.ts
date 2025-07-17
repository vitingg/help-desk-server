import express from "express";
import { createClient, getClients } from "./controller/client-controller";
import { createTech, getTechs } from "./controller/tech-controller";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/", createClient);
app.get("/", getClients);

app.post("/tech", createTech);
app.get("/techs", getTechs);

app.listen(port, () => console.log(`App listening on port ${port}`));
