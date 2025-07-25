import express from "express";
import userRoutes from "./routes/users/client-routes";
import techRoutes from "./routes/users/tech-routes";
import signIn from "./routes/users/auth-routes";
import category from "./routes/tickets/category-routes";
import service from "./routes/tickets/ticket-routes";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/", userRoutes); // create client account
app.use("/", techRoutes); // create tech account
app.use("/", signIn); // sign-in in account

app.use("/", category); // sign-in in account

app.use("/", service);

app.listen(port, () => console.log(`App listening on port ${port}`));
