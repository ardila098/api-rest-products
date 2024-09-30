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
  console.log("Webhook received:", payment);

  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log("Payment data:", data.body);

      const collectorId = data.body.collector_id;
      const statusPayment = data.body.status;

      const order = await Order.findOne({ collector_id: collectorId });

      if (!order) {
        console.log("Order not found for collector_id:", collectorId);
        return res.status(404).json({ error: "Order not found" });
      }

      console.log("Order found:", order);

      let emailDescription = "";
      switch (statusPayment) {
        case "approved":
          order.paymentStatus = PAYMENT_STATUS.PAYMENT_CONFIRMED.id;
          emailDescription = "Compra realizada con éxito";
          break;
        case "rejected":
          order.paymentStatus = PAYMENT_STATUS.PAYMENT_REJECTED.id;
          emailDescription =
            "Tu pago fue rechazado. Por favor, intenta con otro método de pago.";
          break;
        case "pending":
          order.paymentStatus = PAYMENT_STATUS.PENDING_PAYMENT.id;
          emailDescription =
            "Tu pago está pendiente. Te notificaremos cuando se confirme.";
          break;
        default:
          console.log("Unexpected payment status:", statusPayment);
          return res.status(400).json({ error: "Unexpected payment status" });
      }

      const dataEmail = {
        email: order.email,
        description: emailDescription,
      };

      const updatedOrder = await order.save();
      console.log("Order updated:", updatedOrder);

      await sentEmails(dataEmail);

      return res.status(200).json(updatedOrder);
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res
      .status(500)
      .json({ error: "Error processing webhook", details: error.message });
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
