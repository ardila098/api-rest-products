import mercadopago from "mercadopago";
import Order from "../../models/orders/Orders";
import { sentEmails } from "../sentEmails.controller";

export const proccesPayment = async (req, res) => {
  console.log(req.body);

  mercadopago.configure({
    access_token:
      "TEST-3790003707776555-092520-ab34c9a82265eb47d8d12b8c2f70c2b9-628545449",
  });
  const result = await mercadopago.preferences.create({
    items: req.body.items,

    payer: {
      email: "ardilajr@gmail.com",
    },

    back_urls: {
      success: "api.lenceriaverona.com/api/payment/success",
      failure: "api.lenceriaverona.com:api/payment/failure",
      pending: "api.lenceriaverona.com:api/payment/pendign",
    },
    notification_url:
      "api.lenceriaverona.com/api/payment/webhook",
  });

  res.send(result.body);
  console.log(result);
};

export const reciveWebhook = async (req, res) => {
  const payment = req.query;

  console.log("datapayment", payment);
  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log("data", data);

      const collectorId = data.body.collector_id;
      const statusPayment = data.body.status;

      const order = await Order.findOne({ collector_id: collectorId });

      if (!order) {
        console.log("Order not found");
        return res.status(404).json({ error: "Order not found" });
      }

      console.log("Order found:", order);

      const dataEmail = {
        email: "",
        description: "",
      };

      if (statusPayment === "approved") {
        order.paymentStatus = 2;
        dataEmail.email = order.email;
        dataEmail.description = "Compra realizada con exito";
      } else if (statusPayment === "rejected") {
        order.paymentStatus = 3;
        dataEmail.email = order.email;
        dataEmail.description = "Tu Pago genero error";
      }

      const updatedOrder = await order.save();
      console.log("Order updated:", updatedOrder);

      sentEmails(dataEmail);

      return res.status(201).json(updatedOrder);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const createOrders = async (req, res) => {
  console.log(req.body);

  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
};
