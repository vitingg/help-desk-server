import {
  createUserClient,
  getAllClients,
} from "../controller/client-controller";
import { app } from "../lib/app-express";

app.post("/", createUserClient);
app.get("/", getAllClients);
