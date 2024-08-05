import Order from "../models/orders/Orders";

export const createOrder = async (req, res) => {
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

export const getOrders = async (req, res) => {
  const data = await Order.find();
  res.json(data);


};
