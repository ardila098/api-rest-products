import express from "express";
import morgan from "morgan";
import pkg from "../package.json";

import { createRoles } from "./libs/initialSetup";
import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import uploadArray from "./controllers/upload";



const app = express();
const cors = require("cors");

createRoles();

app.set("pkg", pkg);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());



app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    description: app.get("pkg").description,
  });
});

app.use("/api/products", productsRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/uploads", uploadArray);

export default app;
