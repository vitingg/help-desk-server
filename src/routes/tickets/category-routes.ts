import { app } from "@src/lib/app-express";
import {
  createCategories,
  getCategories,
} from "@src/controller/tickets/category-controller";

// Responsável por pegar a categoria do select feito no front
app.post("/category", createCategories);
app.get("/category", getCategories);

export default app;
