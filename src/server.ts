import express from "express";
import {
  createUserClient,
  getAllClients,
} from "./controller/client-controller";
import { createUserTech, getAllTechs } from "./controller/tech-controller";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/", createUserClient);
app.get("/", getAllClients);
app.post("/tech", createUserTech);
app.get("/tech", getAllTechs);

app.listen(port, () => console.log(`App listening on port ${port}`));
