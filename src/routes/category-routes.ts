import app from "./client-routes";
import { categoryController } from "../controller/category-controller";

// Responsável por pegar a categoria do select feito no front
app.get("/category", categoryController )

export default app