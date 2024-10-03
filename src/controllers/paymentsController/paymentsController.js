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
      metadata: req.body,
    });

    res.status(200).json({ init_point: result.body.init_point });
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Error processing payment" });
  }
};

export const receiveWebhook = async (req, res) => {
  const payment = req.query;

  console.log('req.body 36',req.body)

  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log('data 41' , data);
      // const {
      //   name,
      //   email,
      //   celphone,
      //   department,
      //   city,
      //   district,
      //   address,
      //   description,
      //   terms,
      // } = data.body.metadata;

      const order = new Order(
        req.body.metadata
        // name: name || "Nombre no disponible",
        // email: email || "Email no disponible",
        // celphone: celphone || "Celular no disponible",
        // department: department || "Departamento no disponible",
        // city: city || "Ciudad no disponible",
        // district: district || "Distrito no disponible",
        // address: address || "Dirección no disponible",
        // description: description || "Descripción no disponible",
        // terms: terms || false,
        // Agrega otros campos necesarios según tu modelo
      );

      await order.save();
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
