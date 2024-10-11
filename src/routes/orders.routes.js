import express from "express";
const router = express.Router();

import * as ordersCrtl from "../controllers/orders.controller";

router.post("/", ordersCrtl.createOrder);
router.get("/", ordersCrtl.getOrders);
router.put("/:orderId", ordersCrtl.updateOrder);
router.get("/:orderId", ordersCrtl.getOrder);

export default router;
