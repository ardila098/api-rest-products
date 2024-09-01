import express from "express";
import morgan from "morgan";
import "./database.js";
import pkg from "../package.json";
import paymentRoutes from "./routes/payment.routes.js";
import { createRoles } from "./libs/initialSetup.js";
import productsRoutes from "./routes/products.routes.js";
import slidersRoutes from "./routes/sliders.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import referenceRoutes from "./routes/references.routes.js";
import garmentTypeRoutes from "./routes/garmentType.routes.js";
import uploadArray from "./controllers/upload.js";
import path from "path";

const app = express();
const cors = require("cors");

// const cookieParser = require('cookie-parser');

createRoles();

app.set("pkg", pkg);


app.use(cors('*'));

// app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkg").name,
    description: app.get("pkg").description,
  });
});

app.use('/uploads', express.static(path.join(__dirname, '..', 'public', 'uploads')));
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

// app.listen(4000);
app.listen(3000);
console.log("server listen on port", 3000);

export default app;
