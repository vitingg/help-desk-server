import { app } from "@src/lib/app-express";
import {
  createCategories,
  getCategories,
  clientGetCategories,
  putToggleActivities,
  putChangeNameOrPrice,
} from "@src/controller/tickets/category-controller";

// Responsável por pegar a categoria do select feito no front
app.post("/category", createCategories);
app.get("/all-categories", getCategories);
app.get("/available-categories", clientGetCategories);
app.put("/category/:id", putToggleActivities);
app.put("/category/change-parameters/:id", putChangeNameOrPrice);

export default app;
