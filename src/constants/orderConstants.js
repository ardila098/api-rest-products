export const PAYMENT_STATUS = {
  PENDING_PAYMENT: { id: 1, label: "Pendiente de Pago" },
  PAYMENT_CONFIRMED: { id: 2, label: "Pago Confirmado" },
  PAYMENT_REJECTED: { id: 3, label: "Pago Rechazado" },
};

export const SHIPPING_STATUS = {
  PENDING_SEND: { id: 1, label: "listando pedido" },
  SENT: { id: 2, label: "Envío Realizado" },
  DELIVERED: { id: 3, label: "Entregado" },
  NOT_RECEIVED: { id: 4, label: "No Recibido" },
  REJECTED: { id: 5, label: "Rechazado" },
};
