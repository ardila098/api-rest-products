import express from "express";
import morgan from "morgan";
import pkg from "../package.json";
import paymentRoutes from "./routes/payment.routes.js";
import { createRoles } from "./libs/initialSetup";
import productsRoutes from "./routes/products.routes";
import slidersRoutes from "./routes/sliders.routes";
import ordersRoutes from "./routes/orders.routes.js";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
import referenceRoutes from "./routes/references.routes";
import garmentTypeRoutes from "./routes/garmentType.routes";
import uploadArray from "./controllers/upload";

const app = express();
const cors = require("cors");
// const cookieParser = require('cookie-parser');

createRoles();

app.set("pkg", pkg);
app.use(
  cors({
    origin: "https://lenceriaverona.com/api", // Reemplaza con la URL de tu cliente React
    credentials: true, // Esto es necesario para permitir las cookies
  })
);
// app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    description: app.get("pkg").description,
  });
});

app.use("/uploads", express.static("uploads"));

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/sliders", slidersRoutes);
app.use("/api/garmentType", garmentTypeRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categorys", categoryRoutes);
app.use("/api/references", referenceRoutes);
app.use("/api/uploads", uploadArray);
app.use("/api/payment", paymentRoutes);
app.use("/api/orders", ordersRoutes);

export default app;
