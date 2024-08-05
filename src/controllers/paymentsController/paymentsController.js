import mercadopago from "mercadopago";
import Order from "../../models/orders/Orders";

export const proccesPayment = async (req, res) => {
  console.log(req.body);

  mercadopago.configure({
    access_token:
      "APP_USR-1842522987172368-080421-15c1260292841fe49b05f92e9b5dcb4e-1929968217",
  });
  const result = await mercadopago.preferences.create({
    items: req.body.items,
    // items: [
    //   {
    //     title: "tv",
    //     unit_price: 600000,
    //     off: 10,
    //     description: "",
    //     currency_id: "COP",
    //     quantity: 1,
    //   },
    //   {
    //     title: "Laptop",
    //     unit_price: 500000,
    //     description: "",
    //     off: 10,
    //     currency_id: "COP",
    //     quantity: 1,
    //   },
    // ],

    payer: {
      email: "ardilajr@gmail.com",
    },

    back_urls: {
      success: "http://localhost:3000/api/payment/success",
      failure: "http://localhost:3000/api/payment/failure",
      pending: "http://localhost:3000/api/payment/pendign",
    },
    notification_url:
      "https://f829-186-80-28-30.ngrok-free.app/api/payment/webhook",
  });

  res.send(result.body);
  console.log(result);
};

export const reciveWeboHook = async (req, res) => {
  const payment = req.query;
  console.log(payment);
  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);
      res.status(201).json(data);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500).json({ error: error.message });
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
