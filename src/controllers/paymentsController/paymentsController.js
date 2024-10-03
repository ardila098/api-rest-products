import mercadopago from "mercadopago";
import Order from "../../models/orders/Orders";
import { sendEmail } from "../sentEmails.controller";
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
        success: `${process.env.API_BASE_URL}/payment/success`,
        failure: `${process.env.API_BASE_URL}/payment/failure`,
        pending: `${process.env.API_BASE_URL}/payment/pending`,
      },
      notification_url: `${process.env.API_BASE_URL}/payment/webhook`,
    });

    res.status(200).json({ init_point: result.body.init_point });
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

      const statusPayment = data.body.status;

      const order = new Order({
        name: req.body.name,
        email: req.body.email,
        celphone: req.body.celphone,
        department: req.body.department,
        city: req.body.city,
        district: req.body.district,
        address: req.body.address,
        description: req.body.description,
        terms: req.body.terms,
        items: req.body.items,
        paymentId: data.body.id,
        paymentStatus: statusPayment === "approved" ? PAYMENT_STATUS.PAYMENT_CONFIRMED.id : PAYMENT_STATUS.PAYMENT_REJECTED.id,
      });
      await order.save();
      console.log("Order created:", order);

      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res.status(500).json({ error: "Error processing webhook", details: error.message });
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
