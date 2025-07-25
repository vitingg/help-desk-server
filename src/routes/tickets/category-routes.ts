import app from "../users/client-routes";
import { categoryController } from "../../controller/tickets/category-controller";

// Responsável por pegar a categoria do select feito no front
app.get("/category", categoryController);

export default app;
