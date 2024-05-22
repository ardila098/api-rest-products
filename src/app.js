import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import { createRoles } from "./libs/initialSetup";

import authRoutes from "./routes/auth.routes";
import sentEmailsRoutes from "./routes/sentEmails.routes";
import userRoutes from "./routes/user.routes";

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

app.use("/api/sentEmails", sentEmailsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;
