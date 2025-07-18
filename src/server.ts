import express from "express";
import userRoutes from "./routes/client-routes";
import techRoutes from "./routes/tech-routes";
import signIn from "./routes/auth-routes";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/", userRoutes); // create client account
app.use("/", techRoutes); // create tech account
app.use("/", signIn); // sign-in in account

app.listen(port, () => console.log(`App listening on port ${port}`));
