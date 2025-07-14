import {
  createUserClient,
  getAllClients,
} from "../../controller/users/user-client-controller";
import {
  createUserTech,
  getAllTechs,
} from "../../controller/users/user-tech-controller";
import { Router } from "express";
const app = Router();

app.post("/", createUserClient);
app.get("/", getAllClients);
app.post("/tech", createUserTech);
app.get("/tech", getAllTechs);
