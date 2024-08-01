import express from "express";
const router = express.Router();

import * as ordersCrtl from "../controllers/orders.controller";

router.post("/", ordersCrtl.createOrder);
router.get("/", ordersCrtl.getOrders);






export default router;
