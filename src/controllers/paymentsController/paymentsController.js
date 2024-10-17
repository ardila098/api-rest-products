import mercadopago from "mercadopago";
import Order from "../../models/orders/Orders";
import { sendEmail } from "../sentEmails.controller";
import {
  PAYMENT_STATUS,
  SHIPPING_STATUS,
} from "../../constants/orderConstants";

export const processPayment = async (req, res) => {
  try {
    mercadopago.configure({
      access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
    });


    console.log('selected_', req.body)


    try {
      const result = await mercadopago.preferences.create({
        items: req.body.itemsPayment,
        payer: {
          email: req.body.email,
        },
        back_urls: {
          success: `${process.env.API_BASE_URL}/payment/success`,
          failure: `${process.env.API_BASE_URL}/payment/failure`,
          pending: `${process.env.API_BASE_URL}/payment/pending`,
        },
        notification_url: `${process.env.API_BASE_URL}/payment/webhook`,
        metadata: req.body,
      });

      return res.status(200).json({ init_point: result.body.init_point });
    } catch (error) {
      console.error("Error processing payment:", error);
      return res
        .status(500)
        .json({ error: "Error processing payment", details: error.message });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    return res.status(500).json({ error: "Error processing payment" });
  }
};

export const receiveWebhook = async (req, res) => {
  const payment = req.body;

  // console.log("req.body 36", req.body);

  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment.data.id);
      console.log("data 41", data.body);

      const statusPayment = data.body.status;

      const existingOrder = await Order.findOne({ paymentId: payment.data.id });
      if (existingOrder) {
        return res.status(200).json({ status: "already processed" });
      }

  


      



      const dataOrder = {
        ...data.body.metadata,
        paymentId: payment.data.id,
        paymentStatus:
          statusPayment === "approved"
            ? PAYMENT_STATUS.PAYMENT_CONFIRMED.id
            : PAYMENT_STATUS.PAYMENT_REJECTED.id,
        sendStatus:
          statusPayment === "approved"
            ? SHIPPING_STATUS.PENDING_SEND.id
            : SHIPPING_STATUS.REJECTED.id,
      };

      // console.log("dataUser 30", dataOrder);

      const order = new Order(dataOrder);
      const dataNewOrder = await order.save();
      console.log(dataNewOrder);

      const dataEmail = {
        email: data.body.metadata.email,
        description:
          statusPayment === "approved"
            ? "Su pago ha sido exitoso"
            : "Su pago fue rechazado",
        id: dataNewOrder._id,
      };

      sendEmail(dataEmail);

      return res.status(200).json({ status: "success" });
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
