"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SHIPPING_STATUS = exports.PAYMENT_STATUS = void 0;
var PAYMENT_STATUS = exports.PAYMENT_STATUS = {
  PENDING_PAYMENT: {
    id: 1,
    label: "Pendiente de Pago"
  },
  PAYMENT_CONFIRMED: {
    id: 2,
    label: "Pago Confirmado"
  },
  PAYMENT_REJECTED: {
    id: 3,
    label: "Pago Rechazado"
  }
};
var SHIPPING_STATUS = exports.SHIPPING_STATUS = {
  PENDING_SEND: {
    id: 1,
    label: "Pendiente de Envío"
  },
  SENT: {
    id: 2,
    label: "Envío Realizado"
  }
};