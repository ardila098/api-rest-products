import mercadopago from "mercadopago";
import Order from "../../models/orders/Orders";
import { sentEmails } from "../sentEmails.controller";
import { PAYMENT_STATUS } from "../../constants/orderConstants";

export const processPayment = async (req, res) => {
  try {
    mercadopago.configure({
      access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
    });

    const result = await mercadopago.preferences.create({
      items: req.body.items,
      payer: {
        email: req.body.email,
      },
      back_urls: {
        success: `${process.env.API_BASE_URL}/api/payment/success`,
        failure: `${process.env.API_BASE_URL}/api/payment/failure`,
        pending: `${process.env.API_BASE_URL}/api/payment/pending`,
      },
      notification_url: `${process.env.API_BASE_URL}/api/payment/webhook`,
    });

    res.status(200).json(result.body);
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Error processing payment" });
  }
};

export const receiveWebhook = async (req, res) => {
  const payment = req.query;

  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      const collectorId = data.body.collector_id;
      const statusPayment = data.body.status;

      const order = await Order.findOne({ collector_id: collectorId });

      if (!order) {
        console.log("Order not found");
        return res.status(404).json({ error: "Order not found" });
      }

      const dataEmail = {
        email: order.email,
        description: statusPayment === "approved" ? "Compra realizada con éxito" : "Tu Pago generó error",
      };

      order.paymentStatus = statusPayment === "approved" 
        ? PAYMENT_STATUS.PAYMENT_CONFIRMED.id 
        : PAYMENT_STATUS.PAYMENT_REJECTED.id;

      const updatedOrder = await order.save();

      await sentEmails(dataEmail);

      return res.status(200).json(updatedOrder);
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
};