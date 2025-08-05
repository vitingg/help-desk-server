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

app.use("/", userRoutes); // client account
app.use("/", techRoutes); // tech account
app.use("/", signIn); // sign-in in account

app.use("/", category); // see the actually categories

app.use("/", service); // tickets

app.use("/", changePassword); // 

setupSwagger(app);

app.listen(port, () => console.log(`App listening on port ${port}`));

export default app
