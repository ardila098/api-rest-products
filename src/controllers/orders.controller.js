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


export const updateOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Error updating order" });
  }
};

export const getOrder = async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);

  try {
    const data = await Order.findById(orderId);
    if (!data) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ error: "Error fetching order" });
  }
};
