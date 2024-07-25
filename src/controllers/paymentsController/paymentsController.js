import mercadopago from "mercadopago";

export const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token:
      "TEST-4404056600548652-042312-5bb1ea0b814a7950dbe2fe78663adc28-1781427063",
  });
  const result = await mercadopago.preferences.create({
    items: [
      {
        title: "tv",
        unit_price: 600000,
        off: 10,
        description: "",
        currency_id: "COP",
        quantity: 1,
      },
      {
        title: "Laptop",
        unit_price: 500000,
        description: "",
        off: 10,
        currency_id: "COP",
        quantity: 1,
      },
    ],
    payer: {
      email: "ardilajr@gmail.com",
    },

    back_urls: {
      success: "http://localhost:3000/success",
      failure: "http://localhost:3000/failure",
      pending: "http://localhost:3000/pendign",
    },
    notification_url: "https://0b40-190-158-28-71.ngrok-free.app/webhook",
  });
  res.status(201).json(result.body);
  res.send(result.body)
  // console.log(result);
};

export const reciveWeboHook = async (req, res) => {
  const payment = req.query;
  console.log("ooooo");
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
