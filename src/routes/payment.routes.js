import express from "express";
const router = express.Router();

import * as paymentsCrtl from "../controllers/paymentsController/paymentsController";

router.post("/", paymentsCrtl.proccesPayment);

router.get("/success", (req, res) => res.send("send"));

router.get("/failure", (req, res) => res.send("failure"));

router.get("/pending", (req, res) => res.send("pending"));

router.post("/webhook", paymentsCrtl.reciveWebhook);

export default router;
