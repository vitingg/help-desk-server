import express from "express";
import userRoutes from "./routes/client-routes";
import techRoutes from "./routes/tech-routes";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/", userRoutes);
app.use("/", techRoutes);

app.listen(port, () => console.log(`App listening on port ${port}`));
