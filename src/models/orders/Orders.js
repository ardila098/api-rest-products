import { Schema, model } from "mongoose";

import {
  PAYMENT_STATUS,
  SHIPPING_STATUS,
} from "../../constants/orderConstants";

const orderSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: (props) =>
          `${props.value} no es un correo electrónico válido!`,
      },
    },
    celphone: { type: Number, required: true },
    department: { type: String, required: false },
    city: { type: String, required: false },
    address: { type: String, required: false },
    district: { type: String, required: false },
    terms: { type: Boolean, required: true },
    items: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        totalPrice: { type: Number, required: true },
        count: { type: Number, required: true },
        imgs: [{ type: Schema.Types.Mixed }],
        selectedPieces: [
          {
            pieceId: String,
            namePiece: String,
            nameSize: String,
            sizeId: String,
          },
        ],
      },
    ],
    paymentStatus: {
      type: Number,
      default: PAYMENT_STATUS.PENDING_PAYMENT.id,
    },
    sendStatus: {
      type: Number,
      default: SHIPPING_STATUS.PENDING_SEND.id,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Order", orderSchema);
