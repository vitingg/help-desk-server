import changePassword from "./routes/users/change-password-routes";
import category from "./routes/tickets/category-routes";
import { setupSwagger } from "./utils/swagger-config";
import userRoutes from "./routes/users/client-routes";
import techRoutes from "./routes/users/tech-routes";
import service from "./routes/tickets/ticket-routes";
import signIn from "./routes/users/auth-routes";
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/", userRoutes);
app.use("/", techRoutes);
app.use("/", signIn);
app.use("/", category);
app.use("/", service);
app.use("/", changePassword);

setupSwagger(app);

console.log("Bem vindo Desenvolvedor!");
console.log("Acesse api-docs para ver todas as rotas!");
app.listen(port, () => {});

export default app;
