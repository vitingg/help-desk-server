import { app } from "@src/lib/app-express";
import { categoryController } from "@src/controller/tickets/category-controller";

// Responsável por pegar a categoria do select feito no front
app.get("/category", categoryController);

export default app;
